let body = document.querySelector('body');
let cores = ['blue','red','green','yellow'];
let contadorRodadas = 0; //bug do score arrumado pra começar no 0;
let coresD = ['#D81B60','#1E88E5','#FFC107','#004D40']

/*-------------------Criar Template HTML-------------------- */  

function createTable(){
    let header=document.createElement('header');
    header.innerHTML='<b>Jogo Genius</b>';
    body.appendChild(header);

    let scoreDiv = document.createElement('div');
    scoreDiv.classList.add('scoreDiv');

    let name= document.createElement('input');
    name.setAttribute('placeholder','Digite seu nome aqui')
    name.setAttribute('id','name');

    let botao= document.createElement('button');
    botao.classList.add('botao');
    botao.innerText='OK'
    botao.addEventListener('click', entraNome)

    let mensagem= document.createElement('div');
    mensagem.classList.add('mensagem');
    

    let score = document.createElement('h2');
    score.innerText = 'Pontuação:'

    let numScore = document.createElement('span');
    numScore.innerText = Number(contadorRodadas);
    
    let highscore = document.createElement('h2')
    highscore.innerText = 'Highscore: '

    let numHighscore = document.createElement('div');
    numHighscore.classList.add('highscore');
    numHighscore.innerText = '0';

    scoreDiv.appendChild(name)
    scoreDiv.appendChild(botao)
    scoreDiv.appendChild(mensagem)
    scoreDiv.appendChild(score)
    scoreDiv.appendChild(numScore)
    scoreDiv.appendChild(highscore)
    scoreDiv.appendChild(numHighscore)

    let gameBoard = document.createElement('div');
    gameBoard.classList.add('gameBoard')

    let container = document.createElement('div');
    container.classList.add('container');

    gameBoard.appendChild(container);
    gameBoard.appendChild(scoreDiv);
    
    body.appendChild(gameBoard);
    
    for(let i=0;i<cores.length;i++){

        let box = document.createElement('div');
        box.classList.add('box','cor' + i);
        
        let img = document.createElement('img');

        box.style.backgroundColor = coresD[i];

        img.src = 'rubber-duck.png';
        img.style.width = '90px';
        img.style.marginTop = '15px';
        img.style.height = '120px';
        img.style.backgroundColor = coresD[i];

        box.appendChild(img);
        container.appendChild(box);

    }

    return container;
}
/* Entrada do nome no texto */
function entraNome(){
    
    let nome= document.getElementById('name').value;
    let textoEntrada= document.getElementsByClassName('mensagem')[0]
    textoEntrada.innerHTML=`<p>Oiii, <b>${nome}</b>. Bora testar sua memória com o <i>Genius</i>?!</p>`;

    let botaoComeco= document.createElement('button');
    botaoComeco.classList.add('botaoJogo');
    botaoComeco.innerText='Bora!'
    textoEntrada.appendChild(botaoComeco);
    botaoComeco.addEventListener('click', dificuldade);  
}

let table = createTable();
let orderCores = [];
let score = document.querySelector('span');


function dificuldade(){
    let recado= document.getElementsByClassName('mensagem')[0];
    recado.innerHTML = '';
    
    let dificuldade = document.createElement('h2')
    
    dificuldade.innerText = 'Dificuldade:'
    
    
    
    let easy = document.createElement('label');
    easy.innerText = 'Easy';

    let input = document.createElement('input');
    input.type = 'radio';
    input.name = 'dif';
    input.classList.add('radio')

    let medium = document.createElement('label');
    medium.innerText = 'Medium';
    


    let input2 = document.createElement('input');
    input2.type = 'radio';
    input2.name = 'dif';
    input2.classList.add('radio')

    let hard = document.createElement('label');
    hard.innerText = 'Hard';

    let input3 = document.createElement('input');
    input3.type = 'radio';
    input3.name = 'dif';
    input3.checked = true;
    input3.classList.add('radio')
    

    let button = document.createElement('button')
    button.innerText = 'Selecionar';
    button.classList.add('botaoDif')

    recado.appendChild(dificuldade)
    recado.appendChild(easy);
    recado.appendChild(input);
    recado.appendChild(medium);
    recado.appendChild(input2);
    recado.appendChild(hard);
    recado.appendChild(input3);
    recado.appendChild(button);
    
    let inputs = []
    inputs.push(input,input2,input3);
    button.addEventListener('click',function(){
        // caso easy;
        for(i in inputs){
            if(inputs[0].checked == true) return easyDif();
            if(inputs[1].checked == true) return mediumDif();
        }
        return entraJogo();
    })
    
}

function easyDif(){
    table.removeChild(table.children[3])
    table.removeChild(table.children[2]);
    return entraJogo();
}

function mediumDif(){
    table.removeChild(table.children[3]);
    return entraJogo();
}




/* Começo do jogo - botão Jogar */
function entraJogo(){
    let recado= document.getElementsByClassName('mensagem')[0];
    recado.innerHTML=`<p>Vamos lá então, preste bastante atenção na sequência
    e reproduza a ordem clicando na opção correta.</p>`;
    let botaoJogar= document.createElement('button');
    botaoJogar.classList.add('botaoJogo');
    botaoJogar.innerText='Jogar';
    recado.appendChild(botaoJogar);
    if(orderCores) orderCores = [];
    if(document.querySelector('span').innerText != 0){
        document.querySelector('span').innerText = 0;
        contadorRodadas = 0;
        clicksUser=0;
    }
    botaoJogar.addEventListener('click', game);
}

/* Patinho rodando quando o usuário clica */
function rotatePatin(el){
    el.animate([
        {transform:'rotate(90deg)'},
        {transform:'rotate(-90deg)'},
    ],{
        duration:500,
        iterations:1
    })
}

/* Animação de sombra no box de cada cor */
function highlight(el){
    el.animate([
        {boxShadow:'0px 0px 50px 0px white'},
    ],
    {
        duration:500,
        iterations:1
    })
} 

/* Criação da ordem aleatória da box pro jogo */
function createOrdemCores(){
    return table.children[Math.floor(Math.random()*(table.children.length))]
}    


function audioPato (){
    const music = new Audio('pato-som.mp3');
    music.play();
    music.playbackRate = 1;
}



function atualizaScore(){
    score.innerText = contadorRodadas;
}

/* Box piscando de acordo com a ordem definida aleatoriamente e com intervalos */
function piscar_array(array){
    let i = -1
    let intervalo = setInterval(() => {
        i++
        highlight(array[i])
        audioPato();
        if (i >= array.length-1) {
            clearInterval(intervalo)
            let recado=document.getElementsByClassName('mensagem')[0];
            setTimeout(() => recado.innerHTML='<p>Sua vez!</p>', 1000)//coloquei esse tempo pra ele aparecer 1 segundo depois que o ultimo index do array pisca e ficar sincronizado-gambiarra feelings.
        }
    },1000)
}


function game(){
    orderCores.push(createOrdemCores());
    piscar_array(orderCores);
}

/* Função para retornar quando o user erra o click */
function gameOver(){
    let recado=document.getElementsByClassName('mensagem')[0];
    recado.innerHTML='<p><i>Quack, quack, quack... Game over!</i> Não foi desta vez, mas se quiser recomeçar só clicar em "<u>tentar novamente</u>".</p>';
    atualizaHighScore(contadorRodadas);
    let botaoRecomecar= document.createElement('button');
    botaoRecomecar.classList.add('botaoJogo');
    botaoRecomecar.innerText='Tentar novamente';
    recado.appendChild(botaoRecomecar);
    botaoRecomecar.addEventListener('click', entraJogo)
}

/* leitura de click do user */
let clicksUser = 0;
table.addEventListener('click',function(event){
    if(event.path[1].className.includes('box')){
        if(orderCores[clicksUser]!=event.path[1]) return gameOver();
        clicksUser++;
        rotatePatin(event.path[0]);
        
        if(clicksUser == orderCores.length){ 
            let recado=document.getElementsByClassName('mensagem')[0];
            recado.innerHTML='<p><b>BOA!!</b> Você acertou, ponto pra você!</p>';
        
            clicksUser = 0;
            contadorRodadas++;
            atualizaScore();
            game();
        }
    }
})

function atualizaHighScore(pontuacao){
    let highscore = document.querySelector('.highscore');
    high = Number(highscore.innerText);
    if(pontuacao > high){
        highscore.innerText = pontuacao;
    }
}
