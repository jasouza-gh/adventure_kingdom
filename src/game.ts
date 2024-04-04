import {engine} from "./engine.ts";

let main = new engine(4, 160, 120);
//main.sprite_boxed = true;
//main.hitbox_boxed = true;
let player = main.entity('knight', {y:88});
let clouds = main.entities('eud', Math.random()*10);
let back = main.entities('eud', 5, {x:-8*3,y:main.h,w:main.w/8+4,t:1,hp:Math.floor(Math.random()*3+2)})
let water = main.entity('liquid', {x:13*8, y:104, w:7, h:2, lava:false})
let dirts = [
    main.entity('dirt', {x:0,y:104,w:14,h:2}),
    main.entity('dirt', {x: 13*8-2*8, y:104-8*3, w:9, h:5})
];
player.collide = dirts;
main.load('sprites.png');
main.scene('menu', (t, dt)=>{
    main.ctx.fillStyle = 'skyblue';
    main.ctx.fillRect(0, 0, main.w*main.z, main.h*main.z);
    main.add(clouds, back);
    main.ctx.globalAlpha = 0.4;
    main.ctx.fillStyle = '#DDDDDD';
    main.ctx.fillRect(0, 0, main.w*main.z, main.h*main.z);
    main.ctx.globalAlpha = 1;

    main.add(dirts[1], water, dirts[0], player);

    if (player.crouched) player.crouch += (1-player.crouch)*dt/100;
    else player.crouch -= player.crouch*dt/100;
    
    if (main.on('w, ,ArrowUp')) {
        player.crouched = true;
        player.jumping = true;
    } else if (main.on('s,ArrowDown')) {
        player.crouched = true;
        player.jumping = false;
    } else {
        if (player.crouched && player.on_ground && player.jumping) player.m[1] = 12;
        player.crouched = player.jumping = false;
    }
    if(main.on('d,ArrowRight')) player.m[0] += (3-player.m[0])*dt/100;
    else if(main.on('a,ArrowLeft')) player.m[0] -= (3+player.m[0])*dt/100;
    else player.m[0] -= player.m[0]*dt/100;
});
main.render();