#include <bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/detail/standard_policies.hpp>
#include <unordered_set>

#define FORN( i , s , n ) for( int i = (s) ; i < (n) ; i++ )
#define FOR( i , n ) FORN( i , 0 , n )
#define pb push_back
#define mp make_pair
#define fst first
#define snd second
#define sz size()
#define all(x) (x).begin(), (x).end()
#define rall(x) (x).rbegin(), (x).rend()
#define clr(a, v) memset( a , v , sizeof(a) )
#define FORIT( i , x ) for( auto i = x.begin() ; i != x.end() ; i++ )
#define trace(x)    cout << #x << ": " << x << endl;
#define trace2(x, y) cout << #x << ": " << x << " | " << #y << ": " << y << endl;
#define trace3(x, y, z) cout << #x << ": " << x << " | " << #y << ": " << y << " | " << #z << ": " << z << endl;
#define read ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

using namespace std;
using namespace __gnu_pbds;

typedef long long int64;
typedef vector <int> vi;
typedef pair <int,int> ii;
typedef vector <string> vs;
typedef vector <ii> vii;

const int MAX_N=1000005;

char RES[] = {'L','E','V'};
int PUNT[] = { 3,1,0 } ;

vector< pair< pair<int,int> ,  pair<string,string>  > > Lista;
map<string , int> Pais;
vector<int> posiciones;
    
string paisAct;
bool comparePais(const pair<int,string> a, const pair<int,string> b)
{
    if(a.fst != b.fst)
        return a.fst > b.fst;
    else
        if( a.snd==paisAct ) return 1;
        else if( b.snd==paisAct ) return 0;
        else a.snd<b.snd;
}

void readFile(){
    char p1[100],p2[100];
    int s1,s2;
    int val;
    while( (val=scanf("%s %s %d:%d",p1,p2,&s1,&s2)) >= 2 ){
        if(val>2){
            printf("%s %s %d:%d\n",p1,p2,s1,s2);
        }
        else{
            printf("%s %s\n",p1,p2);
            s1=-1;
            s2=-1;
        }
        string c1= p1;
        string c2= p2;
        Lista.pb(   mp( mp(s1,s2 ),mp(c1,c2) )  );
        
    }

}

map<string,double> P;

map< string, map< vii, double > > PR;

map< string, map<vii,  vector< pair< pair<int,int> ,  pair<string,string>  > >   > > ResEjemplo;
map< string, map< vii, vector< pair<int,string> > > > ResTabla;

map< string, map<string, double> > Dep;

int cntEmp = 0;

void analize(vector< pair<int,string> >& L, map<string , vii> &R){
    
    int pos = 0;
    int lim = 5;

    while( pos<5 and L[pos].fst > L[lim].fst  ){
        P[ L[pos].snd ] += 1; 

        PR[ L[pos].snd ][ R[ L[pos].snd ] ] += 1;        
        

        vector< pair< pair<int,int> ,  pair<string,string>  > >  Etemp(all(Lista));
        vector< pair<int,string> > Ttemp(all(L));

        ResEjemplo[ L[pos].snd ][ R[ L[pos].snd ] ] = Etemp;
        paisAct = L[pos].snd;
        sort( all(Ttemp) , comparePais );
        ResTabla[ L[pos].snd ][ R[ L[pos].snd ] ] = Ttemp;


        for(int i=0; i<pos; i++){
            Dep[ L[pos].snd ][ L[i].snd ]++;
            Dep[ L[i].snd ][ L[pos].snd ]++;
        }
        pos++;
    }
    
    int ini = pos;
    int tmp = pos;
    int cnt=0;
    while( L[tmp].fst==L[lim-1].fst )cnt++,tmp++;
        
    if(L[pos].fst  == L[lim-1].fst) cntEmp++;
        
    while( L[pos].fst==L[lim-1].fst ){

        vector< pair< pair<int,int> ,  pair<string,string>  > >  Etemp(all(Lista));
        vector< pair<int,string> > Ttemp(all(L));

        ResEjemplo[ L[pos].snd ][ R[ L[pos].snd ] ] = Etemp;
        paisAct = L[pos].snd;
        sort( all(Ttemp) , comparePais );
        ResTabla[ L[pos].snd ][ R[ L[pos].snd ] ] = Ttemp;

        P[ L[pos].snd ] += (lim-ini)*1.0/cnt;
        PR[ L[pos].snd ][ R[ L[pos].snd ] ] += (lim-ini)*1.0/cnt;
        
        for(int i=0; i<ini; i++){
            Dep[ L[pos].snd ][ L[i].snd ]+=((lim-ini)*1.0/cnt);
            Dep[ L[i].snd ][ L[pos].snd ]+=((lim-ini)*1.0/cnt);
        }
        pos++;
    }
    
    for(int i=ini; i<pos; i++)
        for(int j=i+1; j<pos; j++)
            if(cnt>1){
                Dep[L[i].snd][L[j].snd]+= (5-ini)*(4-ini)*1.0/(cnt*(cnt-1));
                Dep[L[j].snd][L[i].snd]+= (5-ini)*(4-ini)*1.0/(cnt*(cnt-1));
            }       
        
        
      
}


vector< pair<int,string> > genTabla(){

    vector< pair<int,string> > L;
    map<string,int> PaisAux = Pais;
     
    for(int pos : posiciones ){
        auto x = Lista[pos];
        
        string p1 = x.snd.fst;
        string p2 = x.snd.snd;
        int s1 = x.fst.fst;
        int s2 = x.fst.snd;
        
        if(s1>s2){
             PaisAux[p1]+=3;
        }
        else if(s1==s2){
             PaisAux[p1]+=1;
             PaisAux[p2]+=1;
        }
        else{
             PaisAux[p2]+=3;
        }        
    
    }
    
    
    for(auto it : PaisAux ){
        L.pb( mp(it.snd,it.fst) );
    }

    sort(all(L));
    reverse(all(L));
    
    return L;
}

void  printResultados( vector< pair< pair<int,int> ,  pair<string,string>  > > resResultados ){
    cout<<"---"<<endl;
    for(int pos: posiciones )
    {
        auto it = resResultados[ pos ];
        cout<< it.fst.fst <<" "<<it.fst.snd<<" "<<it.snd.fst<<" "<<it.snd.snd<<endl;
    }
    cout<<"---"<<endl;
}

void printTabla( vector< pair<int,string> > restabla ){

    cout<<"---"<<endl;
    int pos=1;
    for(auto p : restabla){
        cout<< (pos++) <<" "<<p.snd<<" "<<p.fst<<endl;
    }
    cout<<"---"<<endl;

}

void print(int i){

            for(auto x : P){
                cout<<x.fst<<" "<<(x.snd*1.0/i)<<endl;
                //printf("%s :%lf\n", x.fst,x.snd/i);
            }
            printf("Empate 5 %.6lf\n",(cntEmp*100.0)/i);
            printf("_________\n");
            
            for(auto p : PR){
                cout<<p.fst<<endl;
                for(ii sc: p.snd.begin()->fst){
                            string local=Lista[sc.fst].snd.fst;
                            string visita=Lista[sc.fst].snd.snd;
                            cout<<(visita==p.fst?local:visita)<<" ";
                }
                                    
                cout<<endl;
                for(auto r : p.snd){
                    int acc = 0;


                    for(ii sc: r.fst){
                        int val;                        

                        if(Lista[sc.fst].snd.fst==p.fst){
                                val=PUNT[sc.snd];
                        } 
                        else{
                            val= PUNT[2-sc.snd];
                        }
                        acc+= val;
                        if(val==3)   cout<<"V ";
                        else if(val==1)cout<<"E ";
                        else cout<<"D ";
                        //cout<<RES[sc.snd]<<" ";
                    }
                    
                    printf("+%d ",acc);
                    printf("%.6lf\n",(r.snd*9.0*100)/i);
                    
                    printResultados( ResEjemplo[ p.fst ][  r.fst ] ); 
                    printTabla( ResTabla[ p.fst ][r.fst] );        
                }
            }
            
            
            printf("_________\n");

}

void imprimeDependencias(){

    cout << setw(20) << left <<"Pais";
    for( auto p1 : Pais ){
        cout <<" "<<setw(7)<<left<< p1.fst.substr(0,3); 
    }
    cout<<endl;
    for( auto p1 : Pais){
        
        double acm= 0;
        
        for( auto p2 : Pais){
            acm += Dep[p1.fst][p2.fst];
        }
        acm/=4;
        
        
        for(auto p2 : Pais){
            Dep[p1.fst][p2.fst]/=acm;
        }       
         
    }
    
    map<string, double> actProb;
    for(auto p1: Pais){
        actProb[p1.fst] = Dep["Brasil"][p1.fst];
    }
    
    
    for( auto p1 : Pais ){
        cout << setw(20) << left << (p1.fst);
        for(auto p2: Pais){
            
            printf("%+8.2lf",((Dep[p1.fst][p2.fst]-actProb[p2.fst])/actProb[p2.fst]) *100) ;
        }

        printf("\n");
    }

}

int main(){
    
    //read
    readFile();      
    
    for( auto x = Lista.begin() ; x!=Lista.end(); x++ ){
    
        if(x->fst.fst==-1){
            posiciones.pb( x - Lista.begin() );
        }
        else{
            string p1 = x->snd.fst;
            string p2 = x->snd.snd;
            
            if(Pais.find(p1)==Pais.end()){
                Pais[p1] = 0;
                P[p1] = 0;
            }   
            if(Pais.find(p2)==Pais.end()){
                Pais[p2] = 0;
                P[p2] = 0;
            }  
            
            int s1 = x->fst.fst; 
            int s2 = x->fst.snd;
            if(s1>s2) Pais[p1]+=3;
            else if(s1<s2) Pais[p2]+=3;
            else{
                Pais[p1]+=1;
                Pais[p2]+=1;
            }
        
        }
    
    }
    
    
    
    int64 i=0;
    for(; i< pow(3LL,10); i++ ){
        map<string , vii> Resultados;
    
        if(i%100000==0){
            printf("%lld\n",i);
            print(i); 
        }
        
        
        int ind = 0;
        int64 tmp = i;
        
        for(auto p : P){
            Resultados[p.fst];
        }
        
        for(int pos: posiciones ){
            int val = tmp%3;
            Lista[pos].fst.fst = 1; 
            if(val == 0 ) Lista[pos].fst.snd = 0;
            else if(val == 1 ) Lista[pos].fst.snd = 1;
            else Lista[pos].fst.snd = 2;
            
            Resultados[ Lista[pos].snd.fst ].pb(mp(pos,val));  
            Resultados[ Lista[pos].snd.snd ].pb(mp(pos,val));
            
            tmp/=3;
        }
        
        
        vector< pair<int,string> > orden;
        
        orden = genTabla();
        analize(orden, Resultados);
    }
    print(i);
    
    imprimeDependencias();
    
     

    return 0;
}
