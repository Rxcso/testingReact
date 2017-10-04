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

arrpais=[]
for im in imagenes:
    m = re.search(r".+Bandera de (?P<pais>.+)\".+src=\"(?P<url>.+)\"",im)
    arrpais.append( { "pais":m.group('pais').replace('ú','u'),"url":"https:"+m.group('url'),"proximos": proximos[len(arrpais)]  } )     

salida = json.dumps(arrpais)
print salida
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

file = open("dataProb").read().split("\n")

todores = ["V","D","E"]

pos=0
nuevoarr=[]
while pos< len(file):
    cnt =  file[pos].count(" ")
    if(cnt==0):
        pais=file[pos]
        Dact={}
        nuevoarr.append(Dact)
        nuevoarr[-1]["pais"]=pais
        pos+=1
        pais1,pais2 = file[pos].strip().split(" ")
        pos+=1

        DProb={}
        for it1 in todores:
            for it2 in todores:
                DProb[it1+it2]={"prob":0,"tag":""}

        while pos<len(file):
            cnt =  file[pos].count(" ")
            if (cnt==0):
                nuevoarr[-1]["probs"]=DProb
                break        
            res1,res2, tagtot, prob = tuple(file[pos].strip().split(" "))       
            prob = float(prob)
            DProb[res1+res2]["prob"]=prob
            DProb[res1+res2]["tag"]=tagtot
            pos+=1
        
salida = json.dumps(nuevoarr)
print salida