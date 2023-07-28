#!/bin/bash

# Chemin vers le script pour démarrer le serveur
SERVER_SCRIPT_PATH="./bash_server_manager/start_server.sh"

# Le chemin du fichier où l'API écrira les commandes
COMMAND_FILE_PATH="/chemin/vers/votre/fichier/de/commandes.txt"

# Boucle infinie pour surveiller les commandes
while true; do
    # Vérifiez si le fichier de commandes existe
    if [[ -f $COMMAND_FILE_PATH ]]; then
        # Lire la première ligne du fichier
        command=$(head -n 1 "$COMMAND_FILE_PATH")

        case $command in
            'start')
                # Lancez le serveur
                bash $SERVER_SCRIPT_PATH &

                # Enregistrez l'ID du processus pour un usage futur
                SERVER_PID=$!
                echo "Server started with PID $SERVER_PID"
                ;;
            'stop')
                # Arrêtez le serveur
                kill $SERVER_PID
                echo "Server stopped"
                ;;
            'show')
                # Affichez les processus du serveur en cours d'exécution
                ps -ef | grep $SERVER_SCRIPT_PATH
                ;;
            *)
                echo "Commande non reconnue : $command"
                ;;
        esac

        # Supprimez la première ligne du fichier de commandes
        sed -i '1d' "$COMMAND_FILE_PATH"
    else
        # Si le fichier de commandes n'existe pas, attendez un moment avant de vérifier à nouveau
        sleep 1
    fi
done
