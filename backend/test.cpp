#include<iostream>
#include<string>

using namespace std;

bool isVowel(char c){

    return (c== 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u');

}

int main(){


    string word = "elephant";

    // char lastVow = "";
    int n = word.length();
    // int i = n - 1;
    // while(lastVow == "" && i > 0 ){
    //     if(isVowel(word[i])){
    //         lastVow = word[i];
    //     }else{
    //         i--;
    //     }
    // }

    // if(lastVow)
    // for(int i = 0 ; i )

    int i = 0;

    int j = n - 1;


    cout<<i<<j<<endl;
   cout<<"Org word - "<<word<<endl; 
    while( i < j && j  > 0 && i < n){ // 0 < 7

        if(isVowel(word[i]) == false){
            i++;
        }

        if(isVowel(word[j]) == false){
            j--;
        }
    if(i <= j && isVowel(word[i])  && isVowel(word[j]) ){
    char ch = word[i];
    word[i] = word[j];
    word[j] = ch;
    break;
        // cout<<word;
    }

    }




cout<<"Modified word - "<<word;


    return 0;

}