# -*- coding: utf-8 -*-
import re
import json

str = open("dataConmebol.txt").read()

todo = re.findall(  "<td.{0,20}>.{0,5}</td>", str )

imagenes = re.findall( "alt=\"Bandera de .+\" src=\".+.svg.png\"" ,str)[:10]

proximos = [ ["Peru","Ecuador"],
["Brasil","Uruguay"],
["Bolivia","Chile"],
["Paraguay","Brasil"],
["Paraguay","Peru"],
["Chile","Argentina"],
["Colombia","Venezuela"],
["Argentina","Colombia"],
["Venezuela","Bolivia"],
["Uruguay","Paraguay"] ]

localia = [ ["L","V"],
["L","V"],
["V","L"],
["L","V"],
["L","V"],
["V","L"],
["V","L"],
["V","L"],
["V","L"],
["L","V"] ]

arrpais=[]
Dpais ={}
for im in imagenes:
    m = re.search(r".+Bandera de (?P<pais>.+)\".+src=\"(?P<url>.+)\"",im)
    arrpais.append( { "pais":m.group('pais').replace('ú','u'),"url":"https:"+m.group('url'),"proximos": proximos[len(arrpais)], "localia": localia[len(arrpais)]  } )     
    Dpais[ arrpais[-1]["pais"] ] = arrpais[-1]


#salida = json.dumps(arrpais)
#print salida
#print(len(todo))

for k,it in enumerate(todo):
    m = re.search(r"<td>(?P<uno>\d):(?P<dos>\d)</td>",it)
    p1 = arrpais[k/10]["pais"]
    p2 = arrpais[k%10]["pais"]
    s=""
    if(m):
        s = "%s:%s"%( m.group('uno'),m.group('dos'))
    if(p1!=p2):
        #print("%s %s %s"%(p1,p2,s))
        pass

file = open("salida").read().split("\n")



def leerRes( ls, p ):
    obj={}
    p+=1
    arrRes = []
    for i in range(10):
        p1,p2, pa1 , pa2 = tuple(file[p].strip().split(" "))
        arrRes.append( { "p1":p1,"p2":p2,"pa1":pa1,"pa2":pa2 } )
        p+=1
    
    p+=2    

    arrL = []
    for i in range(10):
        ind, pi, punti = tuple(file[p].strip().split(" "))
        arrL.append( {"pos":ind, "pais":pi, "punt":punti } )
        p+=1
        
    p+=1
    obj["Tabla"]=arrL    
    obj["Resultados"]=arrRes
    return p,obj


todores = ["V","D","E"]

pos=0
nuevoarr=[]
while pos< len(file):
    cnt =  file[pos].count(" ")
    if(cnt==0):
        pais=file[pos]
        Dact={}
        nuevoarr.append(Dact)
        nuevoarr[-1]["pais"]= pais 
        #print pais
        nuevoarr[-1]["url"] = Dpais[ pais ]["url"]
        nuevoarr[-1]["proximos"]= Dpais[pais]["proximos" ]
        nuevoarr[-1]["localia"]= Dpais[pais]["localia"]

        pos+=1
        pais1,pais2 = file[pos].strip().split(" ")

        reversa = (pais1 != nuevoarr[-1]["proximos"][0])
        pos+=1

        DProb={}
        for it1 in todores:
            for it2 in todores:
                DProb[it1+it2]={"prob":0,"tag":""}

        while pos<len(file):
            cnt =  file[pos].count(" ")
            if (cnt==3):
                res1,res2, tagtot, prob = tuple(file[pos].strip().split(" "))

                if reversa:
                    res1,res2=res2,res1     

                prob = float(prob)
                DProb[res1+res2]["prob"]=prob
                DProb[res1+res2]["tag"]=tagtot
                pos+=1
                pos,Obj = leerRes( file,pos )
                DProb[res1+res2]["obj"]=Obj
                if pos==len(file):
                   nuevoarr[-1]["probs"]=DProb 
            else:
                nuevoarr[-1]["probs"]=DProb
                break       


for temppais in Dpais:
    if temppais not in [ x["pais"] for x in nuevoarr]:
        Dact={}
        nuevoarr.append(Dact)
        nuevoarr[-1]["pais"]= temppais 
        nuevoarr[-1]["url"] = Dpais[ temppais ]["url"]
        nuevoarr[-1]["proximos"]= Dpais[temppais ]["proximos"]
        nuevoarr[-1]["localia"]= Dpais[temppais ]["localia"]

tabla = json.load( open("tablaini") )

salida = json.dumps({"paises":nuevoarr,"tabla":tabla})

print salida
