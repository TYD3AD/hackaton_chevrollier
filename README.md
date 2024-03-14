# Installation et lancement du projet : 
Afin d'installer l'application, vous devez tout d'abord cloner le projet github :
git clone https://github.com/TYD3AD/hackaton_chevrollier.git;

une fois cloné, ouvrez un terminal de commande et exécutez la commande :  (attention vous devez avoir installé node.js avant)
npx react-native start

une fois lancé, appuyez sur "a" pour lancer l'application sur android (IOS n'est pas développé, aucune garantie de fonctionnement)


# Hackaton de 4 jours : Contrôle des accès de l’hémicycle de l’assemblée nationale

## Contexte : 
Dans le cadre d'un hackaton, j'ai eu pour mission de réaliser une application permettant de scanner les QR Codes Vcards des parlementaires souhaitant accéder à l'hémicycle de l'assemblée nationale.

Cette application doit donc être en mesure :
- de scanner un QR code
- d'identifier sont type (si c'est un vCard ou autre)
- d'afficher les informations concernant le parlementaire
- d'afficher la photo de profil du parlementaire en la récupérant sur les sites nosdeputes.fr
- d'indiquer si la personne présentant le QR code est autorisée ou non à entrer dans l'hémicycle
- d'enregistrer l'entrée du parlementaire dans l'hémicycle en base de données

## Caractéristiques techniques : 
Afin de réaliser cette applications, je me suis tourné vers le langage React-Native, permettant de réaliser des applications mobiles en JavaScript, n'étant pas à l'aise avec les langages tel que le flutter ou le kotlin, ce langage était pour moi le plus adéquat à ma situation. 
J'ai développé sur WebStorm ainsi qu'un peu sur Visual Studio Code avec npm et npx.

Ne connaissant pas le langage et n'ayant pas une bonne aisance en développement mobile, je me suis aidé d'intelligence artificielle à savoir ChatGPT, Gemini (anciennement Bard) et également un peu copilot.

En ce qui concerne le développement je me suis concentré sur la partie android, pouvant ainsi tester directement sur mon smartphone physique.

## Git : 
Je n'ai pas pris le temps durant le hackaton de mettre à jour le répertoire préférant avancer sur le projet, la durée étant très courte et ayant beaucoup d'informations à apprendre en si peu de temps.

## Conclusion : 
Je penses avoir atteint une bonne partie des objectifs, je n'ai cependant par réussi à mettre en marche la partie base de données malgré mais différents essais (API PHP ou requête SQL depuis react-native), je ne suis pas parvenue à un résultat et ai rencontré diverses erreurs lors de l'installation de mysql sur l'application.

Hormis ce point, j'ai réussi la majorité des demandes.