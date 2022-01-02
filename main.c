#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>  // STRUKTURA COORD POSTOJI U OVO LIBRARIJU
#include <string.h>
#include <time.h>
// MUSIC, TREBA I LINKER STAVITI(DESNI KLIK NA Projeckt 1 --> BUILD OPTIONS --> LINKER SETTINGS --> U OTHER UBACITI "-lwinmm")

typedef struct{
    char name[30+1];
    int score;
}Person;

//typedef struct _COORD {
//  SHORT X;
//  SHORT Y;
//} COORD, *PCOORD;
COORD coord = {0,0};

void preload();
void gotoxy(int x,int y);
void delay(unsigned int a);
void gameover(int music);

int main()
{
    srand(time(NULL));
    int value[]={'A',2,3,4,5,6,7,8,9,10,'J','Q','K'};
    char suit[]={3,4,5,6};
    int i,j,z=0,n=0;
    int music=0;
    Person*list=malloc(sizeof(Person)*1000);
    char choice;
    PlaySound(TEXT("intro.wav"),NULL,SND_ASYNC|SND_NOSTOP);
    preload();
    PlaySound(TEXT("in.wav"),NULL,SND_ASYNC|SND_NOSTOP);// MUSIC - Uvijek ce biti PlaySound ispred
    while(1){
        system("cls");
        gotoxy(2,2);
        printf("NAVIGATION: Press the numbers to navigate.");
        gotoxy(2,4);
        printf("PRESS 0 for the rules.");
        gotoxy(2,16);
        printf("Creator:");
        gotoxy(2,18);
        printf("-Mario Seider");
        gotoxy(30,6);
        printf("1. Play Black Jack");
        gotoxy(30,8);
        printf("2. Show High Scores");
        gotoxy(30,10);
        printf("3. Delete High Scores");
        gotoxy(30,12);
        printf("4. Exit");
        gotoxy(30,14);
        printf("#!#Extra options if speakers on#!#");
        gotoxy(30,16);
        printf("5. Play music (Trun sounds off!)");
        gotoxy(30,18);
        printf("6. Turn off music (Turn sounds on!)");
        gotoxy(30,20);//- ZA MOJ EKRAN TAMAN ZA STAVITI KARTE
        fflush(stdin);
        choice  = getche();
        // EXIT
        if(choice == '4'){
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            while(1){
                system("cls");
                gotoxy(22,10);
                printf("Are you sure you want to exit?");
                gotoxy(30,12);
                printf("1. Yes");
                gotoxy(30,14);
                printf("2. No");
                gotoxy(30,16);
                fflush(stdin);
                choice = getche();
                if(choice == '1'){
                    if(music!=1){
                        PlaySound(TEXT("end.wav"),NULL,SND_ASYNC);
                    }
                    system("cls");
                    gotoxy(30,8);
                    printf("Signing off, please wait.");
                    z=30;
                    for(i=0;i<6;i++){
                        gotoxy(z,10);
                        printf(". ");
                        z+=2;
                        delay(1);
                    }
                    exit(1);
                }else if(choice == '2'){
                    if(music!=1){
                        PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
                    }
                    break;
                }
            }
        // DELETE HIGH SCORES
        }else if(choice == '3'){
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            while(1){
                system("cls");
                gotoxy(22,10);
                printf("Are you sure you want to delete the high scores?");
                gotoxy(30,12);
                printf("1. Yes");
                gotoxy(30,14);
                printf("2. No");
                gotoxy(30,16);
                fflush(stdin);
                choice = getche();
                if(choice == '1'){
                    if(music!=1){
                        PlaySound(TEXT("clean.wav"),NULL,SND_ASYNC);
                    }
                    system("cls");
                    gotoxy(30,10);
                    printf("The scores have been deleted!");
                    FILE*fin=fopen("HighScores.txt","w");
                    fclose(fin);
                    delay(3);
                    break;
                }else if(choice == '2'){
                    if(music!=1){
                        PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
                    }
                    break;
                }
            }
        // HIGH SCORES
        }else if(choice == '2'){
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            system("cls");
            fflush(stdin);
            FILE*fin=fopen("HighScores.txt","r");
            int n1=0,n2=8;
            while(fscanf(fin,"%[^:]: %d$%*[\n]",list[n1].name,&list[n1].score)==2){
                n1++;
            }
            // SORT
            for(i=0;i<n1;i++){
                for(j=i+1;j<n1;j++){
                    if(list[i].score<list[j].score){
                        Person temp=list[i];
                        list[i]=list[j];
                        list[j]=temp;
                    }
                }
            }
            for(i=0;i<n1;i++){
                gotoxy(30,n2);
                printf("%d. %s: %d$",i+1,list[i].name,list[i].score);
                n2=n2+2;
            }
            gotoxy(1,1);
            printf("Press any key to exit.");
            choice = getche();
            if(music!=1){
               PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
            }
            n=n1;
            fclose(fin);
        }else if(choice == '5'){
            music=1;
            PlaySound(TEXT("music.wav"),NULL,SND_ASYNC|SND_LOOP);
        }else if(choice =='6'){
            music=0;
            PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
        }else if(choice == '0'){
            system("cls");
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            gotoxy(1,1);
            printf("Press any key to exit.");
            gotoxy(2,3);
            printf("BLACK JACK!");
            gotoxy(4,5);
            printf("Get as close to 21 as possible, without going over 21.");
            gotoxy(4,7);
            printf("The ace is worth 1 or 11. Face cards are 10, all others by their value.");
            gotoxy(4,9);
            printf("If you get a 21 your bet will be multiplied with 1,5 and you win instantly.");
            gotoxy(4,11);
            printf("The Dealer needs to get to 17 at least - Soft hand rule.");
            gotoxy(4,13);
            printf("HIT - Get another card.");
            gotoxy(4,15);
            printf("STAND - You are don't want any more cards.");
            gotoxy(4,17);
            printf("DOUBEL DOWN - 2X your bet and you only draw one more card.");
            choice = getche();
            if(music!=1){
               PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
            }
        }else if(choice == '1'){
            //INTRO
            system("cls");
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            gotoxy(22,10);
            printf("You will get 500$, try to get more.");
            delay(3);
            gotoxy(22,12);
            if(music!=1){
                PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            printf("If you lose your money it's game over.");
            delay(3);
            gotoxy(22,14);
            if(music!=1){
                PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            printf("You can end at any time, good luck :D");
            delay(3);
            fflush(stdin);

            //VALET + GAME LOOP
            float cash=500;
            float bet=0;
            int out=0;//EXIT
            int goodBet=0;//KADA REFRESHA DA OSTAVI DOBAR BET I CASH
            int myDisplay=2,dealerDisplay=1;// DA DISPLAYA KARTE
            int myScore=0,dealerScore=0;
            int move=0;// ZA PRIKAZ SAMO BITNO
            int sideA[20],sideB[20],sideA1[20],sideB1[20]; // A JE ZA VALUE B JE ZA SUIT
            int A,B;// GENERIRAJU
            int as=0,asD=0, asM=0, asDM=0;// PROBLEM S 11
            int dealerCard=2; // ZA DEALERA
            int dd=0; // DOUBLE DOWN PROBLEM
            while(1){
                system("cls");
                if(goodBet==0){
                    gotoxy(2,2);
                    printf("Cash: %.2f$",cash);
                    gotoxy(2,4);
                    printf("Bet:");
                }else if(goodBet==1){
                    gotoxy(7,4);
                    printf("%.2f$",bet);
                    gotoxy(2,4);
                    printf("Bet:");
                    gotoxy(2,2);
                    printf("Cash: %.2f$",cash);
                }

                gotoxy(2,16);
                printf("Enter 0 for the bet to exit.");
                gotoxy(2,6);
                printf("RULES:");
                gotoxy(2,7);
                printf("1-HIT");
                gotoxy(2,8);
                printf("2-STAND");
                gotoxy(2,9);
                printf("3-DOUBLE DOWN");
                gotoxy(39,6);// DEALER
                printf("Dealers hand:");
                gotoxy(40,18);//YOU
                printf("Your Hand:");
                gotoxy(7,4);
                // GENERATOR
                if(goodBet==0){
                    for(i=0;i<15;i++){
                        A=rand()%13;
                        B=rand()%4;
                        sideA[i]=A;
                        sideB[i]=B;
                    }
                    for(i=0;i<10;i++){
                        A=rand()%13;
                        B=rand()%4;
                        sideA1[i]=A;
                        sideB1[i]=B;
                    }
                }
                // ISPIS BET-A
                if(goodBet==0){
                    scanf("%f",&bet);
                    if(bet<0){
                        gotoxy(13,4);
                        if(music!=1){
                            PlaySound(TEXT("error.wav"),NULL,SND_ASYNC);
                        }
                        printf("Come on bruh...");
                        delay(2);
                    }else if(bet==0){
                        out=1;
                        if(music!=1){
                            PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
                        }
                    }else if(bet<=cash){
                        if(music!=1){
                            PlaySound(TEXT("chips.wav"),NULL,SND_ASYNC);
                        }
                        gotoxy(7,4);
                        printf("%.2f$",bet);
                        goodBet=1;
                    }else{
                        gotoxy(13,4);
                        if(music!=1){
                            PlaySound(TEXT("error.wav"),NULL,SND_ASYNC);
                        }
                        printf("You don't have enough cahs!");
                        delay(2);
                    }
                }
                //EXIT IZ GAME LOOPA
                if(out==1){
                    system("cls");
                    gotoxy(22,10);
                    printf("Do you want to save your score?");
                    gotoxy(22,12);
                    printf("1. Yes");
                    gotoxy(22,14);
                    printf("2. No (You can press anything.)");
                    choice=getche();
                    if(choice == '1'){
                        if(music!=1){
                            PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
                        }
                        system("cls");
                        char name[30+1];
                        gotoxy(22,10);
                        printf("Enter your name:");
                        gotoxy(22,12);
                        scanf("%s",name);
                        gotoxy(22,13);
                        //ZAPIS SCORE-A
                        FILE*fin=fopen("HighScores.txt","a");
                        fseek(fin,0,SEEK_END);
                        fprintf(fin,"%s: %.2f$\n",name,cash);
                        rewind(fin);
                        fclose(fin);
                        if(music!=1){
                            PlaySound(TEXT("save.wav"),NULL,SND_ASYNC);
                        }
                    }else{
                        if(music!=1){
                            PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
                        }
                    }
                    system("cls");
                    gotoxy(22,10);
                    printf("Thanks for playing!");
                    delay(3);
                    break;
                }
                // DISPLAY KARATA
                if(goodBet==1){
                    for(i=0;i<myDisplay;i++){
                        if(sideA[i]==0){
                            myScore+=11;
                            myScore=myScore-10*asM;
                            gotoxy(36+move,20);
                            move+=5;
                            as++;
                            as=as-asM;
                            printf(" |%c%c|",value[sideA[i]],suit[sideB[i]]);
                        }else if(sideA[i]>9){
                            myScore+=10;
                            gotoxy(36+move,20);
                            move+=5;
                            printf(" |%c%c|",value[sideA[i]],suit[sideB[i]]);
                        }else{
                            myScore=myScore+sideA[i]+1;
                            gotoxy(36+move,20);
                            move+=5;
                            printf(" |%d%c|",value[sideA[i]],suit[sideB[i]]);
                        }
                    }
                    //DEALER
                    if(sideA1[0]==0){
                            dealerScore+=11;
                            gotoxy(36,4);
                            //asD++;
                            printf(" |%c%c|",value[sideA1[0]],suit[sideB1[0]]);
                        }else if(sideA1[0]>9){
                            dealerScore+=10;
                            gotoxy(36,4);
                            printf(" |%c%c|",value[sideA1[0]],suit[sideB1[0]]);
                        }else{
                            dealerScore=dealerScore+sideA1[0]+1;
                            gotoxy(36,4);
                            printf(" |%d%c|",value[sideA1[0]],suit[sideB1[0]]);
                        }
                    //SCORES
                    gotoxy(55,6);
                    printf("%d",dealerScore);
                    gotoxy(52,18);
                    printf("%d",myScore);
                    //TRACK FOR BLACK JACK I AS PROBLEM
                    if(myScore>21 && as==0){
                        gotoxy(42,12);// GDJE IZBACUJE WIN ILI LOSE
                        printf("Busted.");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash-bet;
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                        if(cash==0){
                            gameover(music);
                            break;
                        }
                    }else if(myScore==21){
                        gotoxy(42,12);
                        printf("BLACK JACK.");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash+(bet*1.5);
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                    }else if(myScore>21 && as>0){
                        myScore=myScore-10;
                        asM+=1;
                        gotoxy(55,6);
                        printf("%d",dealerScore);
                        gotoxy(52,18);
                        printf("%d",myScore);
                        if(myScore==21){
                            gotoxy(42,12);
                            delay(2);
                            printf("BLACK JACK.");
                            delay(2);
                            if(music!=1){
                                PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                            }
                            delay(2);
                            goodBet=0;
                            cash=cash+(bet*1.5);
                            bet=0;
                            asD=0;
                            asM=0;
                            myDisplay=2;
                        }
                    }
                }

                gotoxy(17,13); // NEKA BUDE NA PRAZNOM
                move=0;
                fflush(stdin);
                //PROVJERA ZA SLOVO I REFRESH ZA SLOVO
                if(goodBet==1){
                    choice= getche();
                }
                // HIT
                if(choice=='1'&& goodBet==1){
                    if(music!=1){
                        PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                    }
                    myDisplay++;
                // STAND
                }else if(choice=='3'&&goodBet==1&&(2*bet)>cash){
                    printf("\b ");
                    gotoxy(15,4);
                    if(music!=1){
                        PlaySound(TEXT("error.wav"),NULL,SND_ASYNC);
                    }
                    printf(" You can't do that!");
                    delay(2);
                }else if((choice=='2'&&goodBet==1)){
                    printf("\b ");
                    move=0;
                    dealerScore=0;
                    while(1){
                        if(music!=1){
                            PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                        }
                        for(i=0;i<dealerCard;i++){
                            if(sideA1[i]==0){
                                dealerScore+=11;
                                dealerScore=dealerScore-10*asDM;
                                gotoxy(36+move,4);
                                asD++;
                                asD=asD-asDM;
                                move+=5;
                                printf(" |%c%c|",value[sideA1[i]],suit[sideB1[i]]);
                            }else if(sideA1[i]>9){
                                dealerScore+=10;
                                gotoxy(36+move,4);
                                move+=5;
                                printf(" |%c%c|",value[sideA1[i]],suit[sideB1[i]]);
                            }else{
                                dealerScore=dealerScore+sideA1[i]+1;
                                gotoxy(36+move,4);
                                move+=5;
                                printf(" |%d%c|",value[sideA1[i]],suit[sideB1[i]]);
                            }
                        }
                        gotoxy(55,6);
                        printf("%d",dealerScore);
                        gotoxy(17,13);
                        if((dealerScore>=17)&&(dealerScore<=21)){
                            move=0;
                            delay(2);
                            break;
                        }else if(dealerScore>21 && asD>0){
                            dealerScore=dealerScore-10;
                            asDM+=1;
                            gotoxy(55,6);
                            printf("%d",dealerScore);
                            gotoxy(17,13);
                        }else if(dealerScore>21){
                            move=0;
                            dealerScore=0;
                            gotoxy(42,12);
                            printf("Dealer Bust.");
                            delay(2);
                            printf("\b\b\b\b");
                            printf("     ");
                            break;
                        }else if(dealerScore==myScore){
                            move=0;
                            delay(2);
                            break;
                        }
                        delay(2);
                        dealerCard++;
                        asD=0;
                        dealerScore=0;
                        move=0;
                    }

                    if(myScore>dealerScore){
                        gotoxy(42,12);
                        printf("You Win!");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash+bet;
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                    }else if(myScore==dealerScore){
                        gotoxy(42,12);
                        printf("No One Wins!");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash;
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                    }else{
                        gotoxy(42,12);
                        printf("The Dealer Wins!");
                        delay(1);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash-bet;
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                        if(cash==0){
                            gameover(music);
                            break;
                        }
                    }
                //DOUBLE DOWN
                }else if(choice=='3'){
                    printf("\b ");
                    bet=bet*2;
                    gotoxy(7,4);
                    printf("%.2f$",bet);
                    if(music!=1){
                            PlaySound(TEXT("chips.wav"),NULL,SND_ASYNC);
                        }
                    delay(2);
                    if(music!=1){
                            PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                        }
                    if(sideA[myDisplay]==0){
                        if(myScore>10){
                            myScore+=1;
                        }else{
                            myScore+=11;
                        }
                        gotoxy(36+5*myDisplay,20);
                        printf(" |%c%c|",value[sideA[myDisplay]],suit[sideB[myDisplay]]);
                    }else if(sideA[i]>9){
                        myScore+=10;
                        gotoxy(36+5*myDisplay,20);
                        printf(" |%c%c|",value[sideA[myDisplay]],suit[sideB[myDisplay]]);
                    }else{
                        myScore+=sideA[myDisplay]+1;
                        gotoxy(36+5*myDisplay,20);
                        printf(" |%d%c|",value[sideA[myDisplay]],suit[sideB[myDisplay]]);
                    }
                    gotoxy(52,18);
                    printf("%d",myScore);
                    gotoxy(17,13);
                    delay(2);
                    dd=1;
                    if(myScore>21 && as==0){
                        dd=0;
                        gotoxy(42,12);// GDJE IZBACUJE WIN ILI LOSE
                        printf("Busted.");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash-bet;
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                        if(cash==0){
                            gameover(music);
                            break;
                        }
                    }else if(myScore==21){
                        dd=0;
                        gotoxy(42,12);
                        printf("BLACK JACK.");
                        delay(2);
                        if(music!=1){
                            PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                        }
                        delay(2);
                        goodBet=0;
                        cash=cash+(bet*1.5);
                        bet=0;
                        asD=0;
                        asM=0;
                        myDisplay=2;
                    }else if(myScore>21 && as>0){
                        dd=1;
                        myScore=myScore-10;
                        asM+=1;
                        gotoxy(55,6);
                        printf("%d",dealerScore);
                        gotoxy(52,18);
                        printf("%d",myScore);
                        if(myScore==21){
                            dd=0;
                            gotoxy(42,12);
                            delay(2);
                            printf("BLACK JACK.");
                            delay(2);
                            if(music!=1){
                                PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                            }
                            delay(2);
                            goodBet=0;
                            cash=cash+(bet*1.5);
                            bet=0;
                            asD=0;
                            asM=0;
                            myDisplay=2;
                        }
                    }
                    if(dd==1){
                        delay(1);
                        move=0;
                        dealerScore=0;
                        while(1){
                            if(music!=1){
                                PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                            }
                            for(i=0;i<dealerCard;i++){
                                if(sideA1[i]==0){
                                    dealerScore+=11;
                                    dealerScore=dealerScore-10*asDM;
                                    gotoxy(36+move,4);
                                    asD++;
                                    asD=asD-asDM;
                                    move+=5;
                                    printf(" |%c%c|",value[sideA1[i]],suit[sideB1[i]]);
                                }else if(sideA1[i]>9){
                                    dealerScore+=10;
                                    gotoxy(36+move,4);
                                    move+=5;
                                    printf(" |%c%c|",value[sideA1[i]],suit[sideB1[i]]);
                                }else{
                                    dealerScore=dealerScore+sideA1[i]+1;
                                    gotoxy(36+move,4);
                                    move+=5;
                                    printf(" |%d%c|",value[sideA1[i]],suit[sideB1[i]]);
                                }
                            }
                            gotoxy(55,6);
                            printf("%d",dealerScore);
                            gotoxy(17,13);
                            if((dealerScore>=17)&&(dealerScore<=21)){
                                move=0;
                                delay(2);
                                break;
                            }else if(dealerScore>21 && asD>0){
                                dealerScore=dealerScore-10;
                                asDM+=1;
                                gotoxy(55,6);
                                printf("%d",dealerScore);
                                gotoxy(17,13);
                            }else if(dealerScore>21){
                                move=0;
                                dealerScore=0;
                                gotoxy(42,12);
                                printf("Dealer Bust.");
                                delay(2);
                                printf("\b\b\b\b");
                                printf("     ");
                                break;
                            }else if(dealerScore==myScore){
                                move=0;
                                delay(2);
                                break;
                            }
                            delay(2);
                            dealerCard++;
                            asD=0;
                            dealerScore=0;
                            move=0;
                        }

                        if(myScore>dealerScore){
                            gotoxy(42,12);
                            printf("You Win!");
                            delay(2);
                            if(music!=1){
                                PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                            }
                            delay(2);
                            goodBet=0;
                            cash=cash+bet;
                            bet=0;
                            asD=0;
                            asM=0;
                            myDisplay=2;
                        }else if(myScore==dealerScore){
                            gotoxy(42,12);
                            printf("No One Wins!");
                            delay(2);
                            if(music!=1){
                                PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                            }
                            delay(2);
                            goodBet=0;
                            cash=cash;
                            bet=0;
                            asD=0;
                            asM=0;
                            myDisplay=2;
                        }else{
                            gotoxy(42,12);
                            printf("The Dealer Wins!");
                            delay(1);
                            if(music!=1){
                                PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                            }
                            delay(2);
                            goodBet=0;
                            cash=cash-bet;
                            bet=0;
                            asD=0;
                            asM=0;
                            myDisplay=2;
                            if(cash==0){
                                gameover(music);
                                break;
                            }
                        }
                    }
                }
                dd=0;
                asDM=0;
                dealerCard=2;
                myScore=0;
                dealerScore=0;
                as=0;
                asD=0;
            }
        }else if(choice=='*'){
            if(music!=1){
               PlaySound(TEXT("in.wav"),NULL,SND_ASYNC);
            }
            int score=0;
            while(1){
                system("cls");
                int A = rand()%13;
                int A1 = rand()%4;
                gotoxy(20,8);
                if(A==0||A>9){
                    printf("|%c%c|",value[A],suit[A1]);
                }else{
                    printf("|%d%c|",value[A],suit[A1]);
                }
                gotoxy(2,2);
                printf("Press 0 to exit.");
                gotoxy(2,5);
                printf("1-HIGH");
                gotoxy(2,6);
                printf("2-LOW");
                gotoxy(2,7);
                printf("3-EQUAL");
                gotoxy(2,9);
                printf("Score: %d",score);
                gotoxy(20,16);
                fflush(stdin);
                choice=getche();
                if(choice=='0'){
                    if(music!=1){
                        PlaySound(TEXT("out.wav"),NULL,SND_ASYNC);
                    }
                    break;
                }else if(choice=='1'){
                    int B = rand()%13;
                    int B1 = rand()%4;
                    if(music!=1){
                        PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                    }
                    gotoxy(20,16);
                    if(B==0||B>9){
                        printf("|%c%c|",value[B],suit[B1]);
                    }else{
                        printf("|%d%c|",value[B],suit[B1]);
                    }
                    gotoxy(20,12);
                    delay(2);
                    if(B>A){
                        printf("Good prediction.");
                        score++;
                    }else{
                        printf("Bad prediction");
                        score=0;
                    }
                    if(music!=1){
                        PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                    }
                    delay(2);
                }else if(choice=='2'){
                    int B = rand()%13;
                    int B1 = rand()%4;
                    if(music!=1){
                        PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                    }
                    gotoxy(20,16);
                    if(B==0||B>9){
                        printf("|%c%c|",value[B],suit[B1]);
                    }else{
                        printf("|%d%c|",value[B],suit[B1]);
                    }
                    gotoxy(20,12);
                    delay(2);
                    if(B<A){
                        printf("Good prediction.");
                        score++;
                    }else{
                        printf("Bad prediction");
                        score=0;
                    }
                    if(music!=1){
                        PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                    }
                    delay(2);
                }else if(choice=='3'){
                    int B = rand()%13;
                    int B1 = rand()%4;
                    if(music!=1){
                        PlaySound(TEXT("card.wav"),NULL,SND_ASYNC);
                    }
                    gotoxy(20,16);
                    if(B==0||B>9){
                        printf("|%c%c|",value[B],suit[B1]);
                    }else{
                        printf("|%d%c|",value[B],suit[B1]);
                    }
                    gotoxy(20,12);
                    delay(2);
                    if(B==A){
                        printf("Good prediction.");
                        score++;
                    }else{
                        printf("Bad prediction");
                        score=0;
                    }
                    if(music!=1){
                        PlaySound(TEXT("mixing.wav"),NULL,SND_ASYNC);
                    }
                    delay(2);
                }
            }
        }
    }
    return 0;
}
// FUNKCIJE
void delay(unsigned int a){
    unsigned int wait = time(0) + a;
    while(time(0)<wait);
}

void gotoxy(int x,int y){
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),coord);
}

void preload(){
    gotoxy(30,8);
    printf("BLACK JACK!");
    int i,z=30;
    for(i=0;i<6;i++){
        gotoxy(z,10);
        printf(". ");
        z+=2;
        delay(1);
    }
    gotoxy(22,12);
    printf("Press Any Key To Continue...");
    getche();
}

void gameover(int music){
    system("cls");
    gotoxy(35,12);
    printf("GAME OVER!");
    if(music!=1){
        PlaySound(TEXT("game.wav"),NULL,SND_ASYNC);
    }
    delay(4);
}
