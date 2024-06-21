_Google Apps Script_ skript na automatické posielanie denných úmyslov zapísaných v príslušnom Google Sheets súbore.

Vyhľadá aktuálny dátum v rozsahu buniek A6:A30,  
vyberie príslušný text úmyslu v rozsahu buniek C6:C30,  
odošle email s textom úmyslu na zvolenú adresu.  
(Rozsahy sa dajú samozrejme prispôsobiť podľa konkrétneho prípadu.)

Použitie:  
automatické spustenie je dosiahnuté pomocou funkcie `create_trigger()`.  
Funkcia sa má spustiť len raz, vytvorí sa pritom Trigger, ktorý sa následne bude spúšťať automaticky podľa zvoleného nastavenia.  
(Poznámka: príslušná hodina `.atHour(12)` označuje hodinu, v ktorej bude trigger spustený, t.j. časové rozmedzie 12:00~13:00).
