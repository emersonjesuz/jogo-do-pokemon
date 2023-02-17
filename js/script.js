const limiteMovimento = document.querySelector('.limite');
const boneco = document.querySelector('.boneco');
const boss1 = document.querySelector('.boss1');
const boss2 = document.querySelector('.boss2');
const larguraTotal = limiteMovimento.offsetWidth - 120;
const alturaTotal = limiteMovimento.offsetHeight - 120;
const premio = document.querySelector('.premio');
const addPonto = document.querySelector('h3');
const estrela1 = document.querySelector('#icon-estrela-1')
const estrela2 = document.querySelector('#icon-estrela-2')
const estrela3 = document.querySelector('#icon-estrela-3')
const telaEscura = document.querySelector('.tela-escura')
let premioY = alturaTotal - 20;
let premioX = larguraTotal -20;
let passosY = 0;
let passosX = 0;
let ponto = 0;
let movXBoss1 = 500
let movYBoss1 = 50;
let movXBoss2 = 500
let movYBoss2 = 50;
let idaEvoltaBoss1 = 0;
let idaEvoltaBoss2 = 0;
let perdaDeEstrela = 3;
const chegouNoPremio =  passosX >= premioX - 20 && passosX <= premioX + 20;

function movimentoY(){
    if(passosY >= alturaTotal){
        return passosY = alturaTotal;
    }
    if(passosY <= 0){
        return passosY = 0;
    };
}
function movimentoX (){
    if(passosX <= 0){
        return passosX = 0;
    };
    if(passosX >= larguraTotal ){
        return passosX = larguraTotal;
    }
}
document.addEventListener('DOMContentLoaded', ()=>{

    document.addEventListener('keydown', (event)=>{

        if(event.key === "ArrowUp"){
            boneco.src="assets/back.png"
            passosY -= 10;
            movimentoY(passosY)
        };
        if(event.key === "ArrowDown"){
            boneco.src="assets/front.png"
            passosY += 10;
            movimentoY(passosY)
        };
        if(event.key ===  "ArrowRight"){
            boneco.src="assets/right.png"
            passosX -= 10;
           movimentoX(passosX)
        };
        if(event.key === "ArrowLeft"){
            boneco.src="assets/left.png"
            passosX += 10;
            movimentoX(passosX)
        }; 
        if(passosX >= premioX - 100 && passosX <= premioX + 100 && passosY >= premioY - 100 && passosY <= premioY + 100  ){
            premioY = Math.floor(Math.random() * alturaTotal);
            premioX = Math.floor(Math.random() * larguraTotal);
            premio.style.top = `${premioY}px`
            premio.style.right = `${premioX}px`
            premio.style.background = 'rgba(255, 255, 255, 0.226)'
            ponto += 1;
            return;
        }
        
        boneco.style.top = `${passosY}px`;
        boneco.style.right = `${passosX}px`
        addPonto.textContent = ponto;
        premio.style.background = 'transparent';
    })
    
})

async function movimentoAoBoss1 (){
      boss1.style.right = `${movXBoss1}px`
      boss1.style.top = `${movYBoss1}px`  
}
async function movimentoAoBoss2 (){
      boss2.style.right = `${movXBoss2}px`
      boss2.style.top = `${movYBoss2}px`  
}

const movimentoPrimeiro = setInterval(()=>{
    if(idaEvoltaBoss1 === 0){
        movXBoss1 += 20;
        if(movXBoss1 >= larguraTotal - 20){
        movXBoss1 = larguraTotal - 20;
        idaEvoltaBoss1 = 1
        return;
        }
    }
    if(idaEvoltaBoss1 === 1){
        movXBoss1 -= 20;
        if(movXBoss1 <= 0){
        movXBoss1 = 0;
        idaEvoltaBoss1 = 0
            movYBoss1 = Math.floor(Math.random() * alturaTotal)
        return;
        }
    }
    if(passosX >= movXBoss1 - 70 && passosX <= movXBoss1 + 70 && passosY >= movYBoss1 - 80 && passosY <= movYBoss1 + 80  ){
        console.log(`boss venceu bossX ${movXBoss1} passosX ${passosX}`);
        boneco.style.top = passosY = 0
        boneco.style.right = passosX = 0
        perdaDeEstrela--;
        if(perdaDeEstrela === 2){
            estrela3.style.display = 'none'
            return
        }
        if(perdaDeEstrela === 1){
            estrela2.style.display = 'none'
            return
        }
        if(perdaDeEstrela === 0){
            estrela1.style.display = 'none'
            clearInterval(movimentoPrimeiro)
            clearInterval(movimentoSegundo)
            telaEscura.style.display = 'flex'
            return
        }
        return
    }
    movimentoAoBoss1()
    
},100)

const movimentoSegundo = setInterval(()=>{
    if(idaEvoltaBoss2 === 0){
        movYBoss2 += 20;
        if(movYBoss2 >= alturaTotal - 20){
        movYBoss2 = alturaTotal - 20;
        idaEvoltaBoss2 = 1
        return;
        }
    }
    if(idaEvoltaBoss2 === 1){
        movYBoss2 -= 20;
        if(movYBoss2 <= 0){
        movYBoss2 = 0;
        idaEvoltaBoss2 = 0
            movXBoss2 = Math.floor(Math.random() * alturaTotal)
        return;
        }
    }
    if(passosX >= movXBoss2 - 70 && passosX <= movXBoss2 + 70 && passosY >= movYBoss2 - 80 && passosY <= movYBoss2 + 80  ){
        console.log(`boss venceu bossX ${movYBoss2} passosX ${passosX}`);
        boneco.style.top = passosY = 0
        boneco.style.right = passosX = 0
        perdaDeEstrela--;
        if(perdaDeEstrela === 2){
            estrela3.style.display = 'none'
            return
        }
        if(perdaDeEstrela === 1){
            estrela2.style.display = 'none'
            return
        }
        if(perdaDeEstrela === 0){
            estrela1.style.display = 'none'
            clearInterval(movimentoSegundo)
            clearInterval(movimentoPrimeiro)
            telaEscura.style.display = 'flex'
            return
        }
        return
    }
    movimentoAoBoss2()
    
},100)