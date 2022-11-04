/*  -----------------------------------------------------------------------------------------------
    Milestone 1
    ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
    dall’interlocutore (bianco) assegnando due classi CSS diverse
    ● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
    nome e immagine di ogni contatto

    Milestone 2
    ● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
    messaggi relativi al contatto attivo all’interno del pannello della conversazione
    ● Click sul contatto mostra la conversazione del contatto cliccato

    Milestone 3
    ● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
    “enter” il testo viene aggiunto al thread sopra, come messaggio verde
    ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
    un “ok” come risposta, che apparirà dopo 1 secondo.

    Milestone 4
    ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
    contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
    “mar” rimangono solo Marco e Martina)

    Milestone 5 - opzionale
    ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
    permette di cancellare il messaggio selezionato
    ● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
--------------------------------------------------------------------------------------------------- */

// Creo la constante con la libreria luxon per la modifica della data
const DateTime = luxon.DateTime;

// Creo la constante FORMATO_ORA per formattare la data in HH:mm(ore:minuti)
const FORMATO_ORA = "HH:mm";

const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            chatCorrente: 0, // index che indica la chat corrente
            newMessage: '', // 
            searchContactsText: '',
            answerRandom: ['tutto bene', 'mi piace come idea!', 'alle 21 va bene?', 'non mi sento tanto bene...', 'spegni e riaccendi, funziona sempre!'], // Array con le frasi per le risposte random
            contacts: [
                {
                    id: 0,
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 1,
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 4,
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                    {
                    id: 5,
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 6,
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 7,
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                    {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
        }
    },
    computed: {
        // Funzione per filtrare i contatti con l'input
        filteredContacts() {
            return this.contacts.filter((item) => {
                const name = item.name.toLowerCase();
                console.log(name);
                return name.includes(this.searchContactsText.toLowerCase());
            })
        }
    },
    methods: {
        // Metodo che al click dell'utente sul contatto, visualizza la chat corrispondente 
        sceltaChat(id) {
            const index = this.contacts.findIndex((item)=> item.id == id);
            this.chatCorrente = index;
        },
        // Metodo per mandare un messaggio attraverso l'input della chat
        sendNewMessage() {
            const newMessage = this.contacts[this.chatCorrente].newMessage;
            if(!!newMessage.length){
                let newDate = DateTime.now()
                    .setLocale("it")
                    .toFormat(FORMATO_ORA);
                const newSentMessage = {
                    date: newDate,
                    message: newMessage,
                    status: 'sent'
                };
                this.contacts[this.chatCorrente].messages.push(newSentMessage);
                this.contacts[this.chatCorrente].newMessage = '';
                this.$nextTick(()=> {
                    const el =  this.$refs.msg[this.$refs.msg.length - 1 ];
                    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
                });
                this.answered();
            }
        },
        // Metodo per la risposta casuale da parte del computer
        answered(){
            setTimeout(()=>{
            indexRandomMessage = Math.floor(Math.random() * this.answerRandom.length);
            randomMessage = this.answerRandom[indexRandomMessage];
                let newDate = DateTime.now()
                    .setLocale("it")
                    .toFormat(FORMATO_ORA);
            const newReceivedMessage = {
                date: newDate,
                message: randomMessage,
                status: 'received'
            }
            this.contacts[this.chatCorrente].messages.push(newReceivedMessage);
            this.$nextTick(()=> {
                const el =  this.$refs.msg[this.$refs.msg.length - 1 ];
                el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            });
            }, 1000)
        },
        // Metodo per visualizzare l'ultimo messaggio
        getLastMessage(item) {
            const msg = item.messages.filter((message) => {
                return message.status === 'received';
            })
            // console.log(msg);
            return msg[msg.length - 1];
        },
        // Metodo per visualizzate l'ultima data del messaggio
        getLastAccess(index) {  
            let lastMess= this.contacts[index].messages.length -1;
            return this.contacts[index].messages[lastMess].date;
        },
    }
}).mount('#app');
