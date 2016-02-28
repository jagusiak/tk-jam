"undefined"==typeof XMLHttpRequest&&(XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw new Error("This browser does not support XMLHttpRequest.")}),window.SJ=function(){"use strict";function init(e){return app=e?e:"app",window.SJ.settings={configuration:{canvas:{scope:"FULL",file:"canvas"},texture:{scope:"APP",file:"texture"},sound:{scope:"APP",file:"sound"},scenes:{scope:"APP",file:"scenes"},keys:{scope:"APP",file:"keys"}},modules:{utils:"sj/modules/utils",h4render:"sj/modules/h4render",texture:"sj/modules/texture",canvasobject:"sj/modules/canvasobject",scene:"sj/modules/scene",canvas:"sj/modules/canvas",sound:"sj/modules/sound",input:"sj/modules/input",animation:"sj/modules/animation","default":"sj/modules/default",loader:"sj/modules/loader",qte_start:"APP_NAME/modules/qte_start",qte_run:"APP_NAME/modules/qte_run",qte_intro:"APP_NAME/modules/qte_intro",qte_generator:"APP_NAME/modules/qte_generator",qte_game:"APP_NAME/modules/qte_game",letters:"APP_NAME/modules/combos/letters",pair:"APP_NAME/modules/combos/pair",single:"APP_NAME/modules/combos/single",choice:"APP_NAME/modules/combos/choice",triple:"APP_NAME/modules/combos/triple",sequence:"APP_NAME/modules/combos/sequence",random:"APP_NAME/modules/combos/random",listener:"APP_NAME/modules/combos/listener",numbers:"APP_NAME/modules/combos/numbers",arrows:"APP_NAME/modules/combos/arrows"},init:{module:"qte_intro",action:"init"}},window.SJ.config=function(e){var t=e;return function(e,n){return t[e][n]}}({canvas:{fps:25,width:1.5,redner:"h4renderer",canvas_id:"sj-canvas",height:1,loader:"loader"},scenes:{welcome:{objects:{guy:{rotation:0,texture:{left:0,bottom:1,right:1,name:"anim",top:0},dimension:{height:.8,width:.8},position:{y:.3,x:1,z:3},visibility:!0},any_key:{rotation:0,texture:{left:0,bottom:1,right:1,name:"any_key",top:0},dimension:{height:.1,width:.4},position:{y:.8,x:.75,z:8},visibility:!0},back:{rotation:0,texture:{left:0,bottom:1,right:1,name:"logo",top:0},dimension:{height:1,width:1.5},position:{y:.5,x:.75,z:1},visibility:!0}},textures:[],sounds:[]},run:{objects:{ob_5:{rotation:0,texture:{left:.66,bottom:1,right:1,name:"obstacles",top:0},dimension:{height:.25,width:.25},position:{y:.45,x:.75,z:3},visibility:!1},ob_6:{rotation:0,texture:{left:0,bottom:1,right:.33,name:"obstacles",top:0},dimension:{height:.25,width:.25},position:{y:.45,x:.75,z:3},visibility:!1},ob_2:{rotation:0,texture:{left:.15,bottom:1,right:.33,name:"tree",top:0},dimension:{height:.15,width:.15},position:{y:.5,x:.75,z:3},visibility:!1},ob_4:{rotation:0,texture:{left:.66,bottom:1,right:1,name:"obstacles",top:0},dimension:{height:.25,width:.25},position:{y:.45,x:.75,z:3},visibility:!1},any_key:{rotation:0,texture:{left:0,bottom:1,right:1,name:"any_key",top:0},dimension:{height:.1,width:.4},position:{y:.615,x:.75,z:20},visibility:!1},ob_1:{rotation:0,texture:{left:.15,bottom:1,right:.33,name:"tree",top:0},dimension:{height:.15,width:.15},position:{y:.5,x:.75,z:3},visibility:!1},guy:{rotation:0,texture:{left:0,bottom:1,right:.09,name:"anim",top:0},dimension:{height:.4,width:.4},position:{y:.4,x:.75,z:3},visibility:!0},progress:{rotation:0,texture:{left:0,bottom:1,right:1,name:"progress",top:0},dimension:{height:.04,width:.3},position:{y:.05,x:.18,z:8},visibility:!0},stink:{rotation:0,texture:{left:0,bottom:1,right:.5,name:"stink",top:0},dimension:{height:.2,width:.2},position:{y:.35,x:.8,z:11},visibility:!1},ob_0:{rotation:0,texture:{left:.15,bottom:1,right:.33,name:"tree",top:0},dimension:{height:.15,width:.15},position:{y:.5,x:.75,z:3},visibility:!1},background:{rotation:0,texture:{left:0,bottom:1,right:8,name:"bg_1",top:0},dimension:{height:1,width:3},position:{y:.5,x:.75,z:2},visibility:!0},ob_3:{rotation:0,texture:{left:.15,bottom:1,right:.33,name:"tree",top:0},dimension:{height:.15,width:.15},position:{y:.5,x:.75,z:3},visibility:!1}},textures:[],sounds:[]}},texture:{textures:{key_t:"images/t.png",logo:"images/logo.png",anim:"images/agent.png",tree:"images/tree.png",jump:"images/agentjump.png",bg_1:"images/bg_1.png",any_key:"images/any_key.png",arrows:"images/arrows.png",obstacles:"images/sprite_obstacle.png",letters:"images/letters.png",progress:"images/progress.png",stink:"images/stink.png",key_q:"images/q.png",numbers:"images/numbers.png",key_e:"images/e.png"}},keys:{keys:{p:.5,h:.5,w:.5,v:.5,u:.5,f:.5,i:.5,o:.5,k:.5,j:.5,t:.5,q:.5,y:.5,a:.5,e:.5,z:.5,l:.5,n:.5,s:.5,x:.5,g:.5,r:.5,c:.5,d:.5,m:.5,b:.5}},sound:{}}),window.SJ.module=function(e,t){window.SJ.settings.modules[e]||console.error("Module "+e+" not found in settings"),window.SJ[e]&&console.error("Cannot reserve name "+e),window.SJ[e]=t(window.SJ)},window.SJ.module("utils",function(e){return{loadImage:function(e){var t=new Image;return t.src=e,t},loadSound:function(e){var t=new Audio(e);return t.load(),t}}}),window.SJ.module("h4render",function(e){function t(e){var t=e.rh4;t.style.top=d*(e.y-e.height/2)+"px",t.style.left=c*(e.x-e.width/2)+"px",t.style.zIndex=1|e.z,e.translated=!1}function n(e){var t=e.rh4;t.style.width=c*e.width+"px",t.style.height=d*e.height+"px",e.scaled=!1}function o(e){e.rh4.style.transform="rotate("+e.rotation+"rad)",e.rotated=!1}function i(e){var t=100/(e.textureRight-e.textureLeft),n=100/(e.textureBottom-e.textureTop),o=e.rh4,i=100==t?100*e.textureLeft:e.textureLeft/(1-(e.textureRight-e.textureLeft))*100,r=100==n?100*e.textureTop:e.textureTop/(1-(e.textureBottom-e.textureTop))*100;o.style.backgroundImage="url('"+e.texture.image.src+"')",o.style.backgroundSize=t+"% "+n+"%",o.style.backgroundPosition=i+"% "+r+"%",e.textured=!1}function r(e){e.rh4.style.display=e.visible?"block":"none",e.rotated=!1}var s,a,u,c,d;return{init:function(e,t,n){s=e,a=t,u=n,c=s.offsetWidth/t,d=s.offsetHeight/n},start:function(e){for(var a in e.objects){var u=e.objects[a],c=document.createElement("div");c.id="sj-rh4-"+u.name,c.style.position="absolute",u.rh4=c,s.appendChild(c),t(u),n(u),o(u),i(u),r(u)}e.started=!0},stop:function(e){e.started=!1;for(var t in e.objects){var n=e.objects[t];s.removeChild(n.rh4),delete n.rh4}},remove:function(e){s.removeChild(e.rh4)},frame:function(e){if(e.started)for(var s in e.objects){var a=e.objects[s];a.translated&&t(a),a.rotated&&o(a),a.textured&&i(a),a.scaled&&n(a),a.displayed&&r(a)}}}}),window.SJ.module("texture",function(e){function t(){}function n(e){if(!o[e])throw new Error("Texture '"+e+"' not defined!");return!0}var o=e.config("texture","textures"),i={};for(var r in o)i[r]=new t,i[r].name=r;return{load:function(t){n(t)&&!i[t].image&&(i[t].image=e.utils.loadImage(o[t]))},unload:function(e){n(e)&&i[e].image&&delete i[e].image},get:function(e){return n(e)?i[e]:void 0},loaded:function(e){return n(e)?!!i[e].image:void 0}}}),window.SJ.module("canvasobject",function(e){function t(e){var t=this;this.name=e,this.width=1,this.height=1,this.rotation=0,this.x=0,this.y=0,this.z=1,this.visible=!0,this.setPosition=function(e,n,o){t.x=e,t.y=n,t.z=1|o,t.translated=!0},this.setDimension=function(e,n){this.width=e,this.height=n,t.scaled=!0},this.setVisible=function(e){t.visible=e,t.displayed=!0},this.setRotation=function(e){t.rotation=e,t.rotated=!0},this.setTexture=function(e,n,o,i,r){t.texture=e,t.textureLeft=n,t.textureRight=i,t.textureTop=o,t.textureBottom=r,t.textured=!0}}return{create:function(e){return new t(e)}}}),window.SJ.module("scene",function(e){function t(t,n){var o=this;if(o.objects={},o.sounds={},o.start=function(){var n={};for(var i in o.objects){var r=o.objects[i];r.texture&&!e.texture.loaded(r.texture.name)&&(n[r.texture.name]=!0)}for(var s in n)e.texture.load(s);for(var a in o.sounds)e.sound.load(a);t.start(o)},o.stop=function(){t.stop(o)},o.frame=function(){t.frame(o)},o.createObject=function(t){if(!o.objects[t]){var n=e.canvasobject.create(t);return o.objects[t]=n,n}new Error("Object with name '"+t+"' already exists in scene")},o.removeObject=function(e){o.objects[e]&&(t.remove(o.objects[e]),delete o.objects[e])},o.getObject=function(e){return o.objects[e]},o.attachSound=function(t){if(!o.sounds[t]){var n=e.sound.get(t);return o.sounds[t]=n,n}new Error("Sound with name '"+t+"' already attached scene")},o.dettachSound=function(e){delete o.sounds[e]},o.getSound=function(e){return o.sounds[e]},n&&n.objects)for(var i in n.objects){var r=o.createObject(i),s=n.objects[i];s.position&&r.setPosition(s.position.x,s.position.y,s.position.z),s.rotation&&r.setRotation(s.rotation),s.dimension&&r.setDimension(s.dimension.width,s.dimension.height),s.texture&&r.setTexture(e.texture.get(s.texture.name),s.texture.left,s.texture.top,s.texture.right,s.texture.bottom),r.setVisible(s.visibility)}if(n&&n.sounds)for(var a in n.sounds){var u=n.sounds[a];o.attachSound(u)}if(n&&n.textures)for(var c in n.textures)e.texture.load(n.textures[c])}return{create:function(e,n){return new t(e,n)}}}),window.SJ.module("canvas",function(e){function t(){var e=(new Date).getMilliseconds();if(n){var o=s[n];o.onFrame&&o.onFrame(),o.frame()}a&&setTimeout(t,Math.max(1,r-(new Date).getMilliseconds()+e))}var n,o,i=e.config("canvas","fps")||20,r=1e3/i,s={},a=!1,u=document.getElementById(e.config("canvas","canvas_id")),c=e.config("canvas","loader")||"loader";return{init:function(){if(o=e[e.config("canvas","render")||"h4render"],!o)throw new Error("Render not found!");o.init(u,e.config("canvas","width")||1,e.config("canvas","height")||1)},createScene:function(t,n){if(s[t])throw new Error("Scene name '"+t+"' alredy exists");return s[t]=e.scene.create(o,n),s[t]},loadScene:function(t){var o=s[t],i=e.canvas.getLoader();if(i.start(u),!o)throw new Error("Scene name '"+t+"' does not exists");n&&(o=s[n],o.onStop&&(o.onStop(),i.progress(u,25)),o.stop()),i.progress(u,50),n=t,o=s[n],o.onStart&&(o.onStart(),i.progress(u,75)),i.progress(u,100),i.finish(u,o.start)},reloadScene:function(){e.canvas.loadScene(n)},getScene:function(e){return s[e]},removeScene:function(e){if(!s[e])throw new Error("Scena name does not '"+e+"' alredy exist");if(n===e)throw new Error("Cannot remove running scene");s[e].onDestroy&&s[e].onDestroy(),s[e].destroy(),delete s[e]},start:function(){a||(a=!0,t())},stop:function(){a&&(a=!1)},getCanvas:function(){return u},getLoader:function(){return e[c]}}}),window.SJ.module("sound",function(e){function t(){var e=this;e.play=function(){e.sound.currentTime=0,e.sound.play()}}function n(e){if(!o[e])throw new Error("Sound '"+e+"' not defined!");return!0}var o=e.config("sound","sounds"),i={};for(var r in o)i[r]=new t,i[r].name=r;return{load:function(t){n(t)&&!i[t].sound&&(i[t].sound=e.utils.loadSound(o[t]))},unload:function(e){n(e)&&i[e].image&&delete i[e].image},get:function(e){return n(e)?i[e]:void 0},loaded:function(e){return n(e)?!!i[e].image:void 0}}}),window.SJ.module("input",function(e){function t(e,t,n){s[e];i(e),s[e]=function(e){n&&e.preventDefault(),t(e.keyCode)},document.addEventListener(e,s[e])}function n(e,t,n){s[e];o(e),s[e]=function(e){n&&e.preventDefault(),t((e.pageX-r.offsetLeft)/a,(e.pageY-r.offsetTop)/u)},r.addEventListener(e,s[e])}function o(e){var t=s[e];t&&(r.removeEventListener(e,t),delete s[e])}function i(e){var t=s[e];t&&(document.removeEventListener(e,t),delete s[e])}var r=e.canvas.getCanvas(),s={},a=r.offsetWidth/(e.config("canvas","width")||1),u=r.offsetHeight/(e.config("canvas","height")||1);return{KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KET_CTRL:17,KEY_ALT:18,KEY_ESCAPE:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,onKeyDown:function(e,n){t("keydown",e,n)},onKeyUp:function(e,n){t("keyup",e,n)},onMouseMove:function(e,t){n("mousemove",e,t)},onMouseClick:function(e,t){n("click",e,t)},clearKeyDown:function(){i("keydown")},clearKeyUp:function(){i("keyup")},clearMouseMove:function(){o("mousemove")},clearMouseClick:function(){o("click")}}}),window.SJ.module("animation",function(e){function t(e){var t=this,n=e,o=1,i=0,r=0,s=[],a=!0,u=!1;t.addFrame=function(e,t,n,o,i){s.push({texture:e,left:t,top:n,right:o,bottom:i})},t.setStep=function(e){o=e},t.setLooped=function(e){a=e},t.setCurrentFrame=function(e){r=0|e,i=e*o,u=!1},t.play=function(e){var t=Math.floor(i/o);if(t!==r)if(t<s.length||a){var c=s[t%s.length];n.setTexture(c.texture,c.left,c.top,c.right,c.bottom),r=t}else u=!0;i++},t.hasStopped=function(){return u}}return{create:function(e){return new t(e)}}}),window.SJ.module("default",function(e){return{start:function(){alert("Welcome to sj.js\nI hope you will enjoy it!")}}}),window.SJ.module("loader",function(e){var t,n;return{start:function(e){setTimeout(function(){if(!t){var o,i=document.createElement("div");i.style.fontFamily="'Lucida Console', Monaco, monospace",i.style.position="relative",i.style.textAlign="center",i.style.lineHeight="0px",n=i.cloneNode(),o=i.cloneNode(),i.style.fontSize="20px",i.style.top="45%",i.innerHTML="[SJ.JS]",n.style.fontSize="15px",n.style.top="70%",n.innerHTML="(0%)",o.style.fontSize="10px",o.style.top="85%",o.innerHTML="https://github.com/jagusiak/sj.js",t=e.cloneNode(),t.style.backgroundColor="darkslategrey",t.style.color="white",t.appendChild(i),t.appendChild(n),t.appendChild(o)}e.parentNode.replaceChild(t,e)},1)},progress:function(e,t){setTimeout(function(){n.innerHTML="("+Math.round(t)+"%)"},1)},finish:function(e,n){setTimeout(function(){t.parentNode.replaceChild(e,t),n()},1e3)}}}),window.SJ.module("qte_start",function(e){return{init:function(){var t,n,o,i,r,s,a,u,c=0,d=e.letters,l=[];t=e.canvas,t.init(),a=e.qte_generator,u=a.next(),s=e.listener,n=t.createScene("scene_1",e.config("scenes","run"));for(var f=0;1>f;f++){var m=n.createObject("a");l.a=m,d.set(m,f,f,f)}o=n.getObject("background"),r=n.getObject("guy"),i=e.animation.create(r),i.setStep(4);for(var f=0;6>f;f++)i.addFrame(r.texture,f/6,0,(f+1)/6,1);n.onFrame=function(){c++,o.setTexture(o.texture,o.textureLeft+.1,o.textureTop,o.textureRight+.1,o.textureBottom),i.play();for(var e in l)d.state(l[e],d.STATE_CORRECT);c%30&&(s.clear(),u=a.next())},e.input.onKeyDown(function(e){s.down(String.fromCharCode(e).toLowerCase(),c)}),e.input.onKeyUp(function(e){s.up(String.fromCharCode(e).toLowerCase(),c)}),t.start(),t.loadScene("scene_1")}}}),window.SJ.module("qte_run",function(e){return{init:function(){var t,n,o=e.canvas,i=e.qte_generator,r=i.next(),s=e.listener,a={},u=0;o.init(),t=o.createScene("scene_1",e.config("scenes","keys"));for(var c in n){var d=n[c];a[d]=t.getObject("key_"+d)}t.onFrame=function(){u++;for(var e in n)a[n[e]].setVisible(!0);u%30===0&&(s.clear(),r=i.next())},e.input.onKeyDown(function(e){s.down(String.fromCharCode(e).toLowerCase(),u)}),e.input.onKeyUp(function(e){s.up(String.fromCharCode(e).toLowerCase(),u)}),o.start(),o.loadScene("scene_1")}}}),window.SJ.module("qte_intro",function(e){return{init:function(){var t,n,o,i=e.canvas,r=0;i.init(),t=i.createScene("welcome",e.config("scenes","welcome")),o=t.getObject("guy"),n=e.animation.create(o);for(var s=0;6>s;s++)n.addFrame(o.texture,s/16,0,(s+1)/16,1);t.onFrame=function(){r++,t.getObject("any_key").setVisible(Math.floor(r/10)%2),n.play()},e.input.onKeyDown(function(t){e.input.clearKeyDown(),e.qte_game.init()}),i.start(),i.loadScene("welcome")}}}),window.SJ.module("qte_generator",function(e){return{next:function(){var t=[e.single,e.pair,e.choice,e.sequence,e.triple],n=t[t.length*Math.random()<<0];return n.next()}}}),window.SJ.module("qte_game",function(e){var t,n,o,i,r,s,a=0,u=.02,c=function(){var t=n.getObject("guy"),a=n.getObject("stink");o=e.animation.create(t),i=e.animation.create(t),r=e.animation.create(t),s=e.animation.create(a),i.setStep(4),i.setLooped(!1),s.setStep(4),r.setStep(7),r.setLooped(!1);for(var u=0;6>u;u++)o.addFrame(t.texture,u/16,0,(u+1)/16,1);for(u=6;10>u;u++)i.addFrame(t.texture,u/16,0,(u+1)/16,1);for(u=11;13>u;u++)r.addFrame(t.texture,u/16,0,(u+1)/16,1);for(u=0;2>u;u++)s.addFrame(a.texture,u/2,0,(u+1)/2,1)},d=function(){var d,l,f,m,g,h,p,v,w,y,b,x,E,_=0,S=0,T=[],P=[],j=!1,A=!0,C=[],k=["ob_0","ob_1","ob_2","ob_3"],O=["ob_4","ob_5","ob_6"],R=0,M=!1;t=e.canvas,t.init(),n||(n=t.createScene("scene_1",e.config("scenes","run"))),d=n.getObject("background"),x=n.getObject("progress"),f=n.getObject("guy"),c();for(var L in k)C[R]=n.getObject(k[L]),C[R].animation=i,R++;for(L in O)C[R]=n.getObject(O[L]),C[R].animation=r,R++;g=e.numbers,P=g.init(n),y=e.qte_generator,b=y.next(),m=e.letters,T=m.init(n),h=e.arrows,p=h.init(n),w=e.listener,l=o,n.onFrame=function(){var t,i=10-Math.floor(_/25);if(_++,x.setTexture(x.texture,0,0,i/10,1),x.setPosition(.02*i+.03,.03,10),x.setDimension(.04*i,.04),0>i)return s.play(),n.getObject("stink").setVisible(!0),n.getObject("any_key").setVisible(!0),f.setTexture(f.texture,.875,0,.9375,1),void e.input.onKeyDown(function(){_=0,n.getObject("stink").setVisible(!1),n.getObject("any_key").setVisible(!1),A=!0;for(var t in C)C[t].setVisible(!1);E=void 0,j=0,f.setVisible(!0),e.input.onKeyDown(function(e){w.down(String.fromCharCode(e).toLowerCase(),_)}),e.input.onKeyUp(function(e){w.up(String.fromCharCode(e).toLowerCase(),_)}),w.resetScore(),e.numbers.set(P.tenth,P.unit,0)});if(A){for(t=Math.floor(Math.random()*C.length);C[t].visible;)t=Math.floor(Math.random()*C.length);var r=C[t];r.setPosition(5>_?-.7:-.4,r.y,r.z),r.setVisible(!0),A=!1}0>_-j?f.setVisible(_%2):f.setVisible(!0),d.setPosition(a-1.5*Math.floor(a/1.5),d.y,d.z),l.play(),l.hasStopped()&&(l=o),a+=u,void 0!==v&&v.play();for(t in C){var c=C[t];if(c.visible){if(c.setPosition(c.x+u,c.y,c.z),c.x>1.8&&c.setVisible(!1),c.x>-.5&&c.x<.5&&!E){E=c,S=0,w.clear(),b=y.next(),v=h.set(p,b.type);for(var g in e.config("keys","keys")){var k=b.keys.indexOf(g),O=T[g];-1!=k?(m.position(O,k),O.setVisible(!0)):O.setVisible(!1)}u=.02,M=!1}E&&E.x>.5&&(A=!0,M?(l=E.animation,l.setCurrentFrame(0)):j=_+20,E=void 0,w.clear())}}if(M&&(u=.06),E)for(var g in b.keys){var R=b.keys[g],L=w.check(b,R,P);m.state(T[R],L),e.letters.STATE_CORRECT===L&&(M=!0,w.clear())}},e.input.onKeyDown(function(e){w.down(String.fromCharCode(e).toLowerCase(),_)}),e.input.onKeyUp(function(e){w.up(String.fromCharCode(e).toLowerCase(),_)}),t.start(),t.loadScene("scene_1")};return{init:d}}),window.SJ.module("letters",function(e){return{STATE_IDLE:0,STATE_CORRECT:1,STATE_INCORRECT:2,STATE_PART:3,POS_TOP:0,POS_MIDDLE:1,POS_BOTTOM:2,POS_OFFSET:.1,BASE_X:.75,BASE_Y:.728,BASE_Z:10,DIVIDER_X:.25,DIVIDER_Y:.03846,init:function(t){var n={},o=0;for(var i in e.config("keys","keys")){var r=t.createObject(i);n[i]=r,e.letters.set(r,o++,e.letters.STATE_IDLE,0)}return n},set:function(t,n,o,i){var r=o*e.letters.DIVIDER_X,s=n*e.letters.DIVIDER_Y;e.texture.load("letters"),t.setTexture(e.texture.get("letters"),r,s,r+e.letters.DIVIDER_X,s+e.letters.DIVIDER_Y),t.setDimension(.09,.09),t.setPosition(.75,.728+i*e.letters.POS_OFFSET,e.letters.BASE_Z),t.setVisible(!1)},position:function(t,n){t.setPosition(e.letters.BASE_X,e.letters.BASE_Y+n*e.letters.POS_OFFSET,e.letters.BASE_Z)},state:function(t,n){var o=n*e.letters.DIVIDER_X;t.setTexture(t.texture,o,t.textureTop,o+e.letters.DIVIDER_X,t.textureBottom)}}}),window.SJ.module("pair",function(e){return{next:function(){for(var t=(e.config("keys","keys"),e.random),n=t.get(),o=t.get();o===n;)o=t.get();return{type:e.arrows.TYPE_PAIR,keys:[n,o],points:2}}}}),window.SJ.module("single",function(e){return{next:function(){var t=(e.config("keys","keys"),e.random);return{type:e.arrows.TYPE_SINGLE,keys:[t.get()],points:1}}}}),window.SJ.module("choice",function(e){return{next:function(){for(var t=(e.config("keys","keys"),e.random),n=t.get(),o=t.get();o===n;)o=t.get();return{type:e.arrows.TYPE_CHOICE,keys:[n,o],points:1}}}}),window.SJ.module("triple",function(e){return{next:function(){for(var t=(e.config("keys","keys"),e.random),n=t.get(),o=t.get(),i=t.get();o===n;)o=t.get();for(;i===n||i===o;)i=t.get();return{type:e.arrows.TYPE_TRIPLE,keys:[n,o,i],points:3}}}}),window.SJ.module("sequence",function(e){return{next:function(){for(var t=(e.config("keys","keys"),e.random),n=t.get(),o=t.get(),i=t.get();o===n;)o=t.get();for(;i===n||i===o;)i=t.get();return{type:e.arrows.TYPE_SEQUENCE,keys:[n,o,i],points:4}}}}),window.SJ.module("random",function(e){return{get:function(){var t,n=e.config("keys","keys"),o={},i=0;for(var r in n)i+=parseFloat(n[r]),o[r]=i;t=Math.random()*i;for(var s in o)if(o[s]>=t)return s}}}),window.SJ.module("listener",function(e){var t,n={},o=0,i=function(e){var t;for(var n in e)-1!==e[n]&&(void 0===t?t=e[n]:-1!=e[n]&&t>e[n]&&(t=e[n]));return t},r=function(e){var t;for(var n in e)-1!==e[n]&&(void 0===t?t=e[n]:t<e[n]&&(t=e[n]));return t},s=function(e,t){var n={};for(var o in t)e(o)&&(n[o]=t[o]);return n},a=function(t,o){var a=t.keys,u=a.length,c=Object.keys(n),d=c.length;switch(t.type){case e.arrows.TYPE_SINGLE:case e.arrows.TYPE_PAIR:case e.arrows.TYPE_TRIPLE:var l=s(function(e){return-1!=a.indexOf(e)},n),f=i(n),m=r(n),g=Object.keys(l),h=g.length;return 0>=d?e.letters.STATE_IDLE:d!==h||1<Math.abs(m-f)?e.letters.STATE_INCORRECT:u>h?void 0!==o&&-1!=g.indexOf(o)?e.letters.STATE_PART:e.letters.STATE_PART:e.letters.STATE_CORRECT;case e.arrows.TYPE_CHOICE:if(1===d)return 1===Object.keys(s(function(e){return-1!=a.indexOf(e)},n)).length?e.letters.STATE_CORRECT:e.letters.STATE_INCORRECT;if(0>=d)return e.letters.STATE_IDLE;case e.arrows.TYPE_SEQUENCE:var p=i(s(function(e){return-1!=a.indexOf(e)},n));for(var v in a){var w=n[a[v]];if(void 0===w)return e.letters.STATE_IDLE;if(p>w)return e.letters.STATE_INCORRECT;if(void 0!==o&&v===o)return e.letters.STATE_PART;p=w}return d===u?e.letters.STATE_CORRECT:e.letters.STATE_INCORRECT;default:return!1}return!1};return{down:function(e,t){n[e]=-1},up:function(e,t){void 0!==n[e]&&-1===n[e]&&(n[e]=t)},check:function(n,i,r){var s=a(n);return t!==s&&e.letters.STATE_CORRECT===s&&(o+=n.points,t=s,e.numbers.set(r.tenth,r.unit,o)),s},clear:function(){n={},t=void 0},resetScore:function(){o=0}}}),window.SJ.module("numbers",function(e){return{init:function(t){var n=t.createObject("tenth"),o=t.createObject("unit");return n.setTexture(e.texture.get("numbers"),0,0,1,1),n.setDimension(.09,.09),n.setPosition(1.25,.1,e.letters.BASE_Z),n.setVisible(!1),o.setTexture(e.texture.get("numbers"),0,0,1,1),o.setDimension(.09,.09),o.setPosition(1.25,.1,e.letters.BASE_Z),o.setVisible(!1),{tenth:n,unit:o}},set:function(t,n,o){if(e.texture.load("numbers"),o>=10){var i=Math.floor(o/10);t.setTexture(e.texture.get("numbers"),.1*i,0,.1*i+.1,1),t.setDimension(.09,.09),t.setPosition(1.33,.1,e.letters.BASE_Z),t.setVisible(!0)}else t.setVisible(!1);var r=o%10;n.setTexture(e.texture.get("numbers"),.1*r,0,.1*r+.1,1),n.setDimension(.09,.09),n.setPosition(1.4,.1,e.letters.BASE_Z),n.setVisible(!0)}}}),window.SJ.module("arrows",function(e){return{TYPE_SINGLE:0,TYPE_PAIR:1,TYPE_TRIPLE:2,TYPE_SEQUENCE:3,TYPE_CHOICE:4,init:function(t){var n=t.createObject("arrows");return n.setTexture(e.texture.get("arrows"),0,0,1,1),n.setDimension(.2,35/105),n.setPosition(.9,.83,e.letters.BASE_Z),n.setVisible(!1),n},set:function(t,n){e.texture.load("arrows"),t.setTexture(e.texture.get("arrows"),.2*n,0,.2*n+.2,.33),t.setDimension(.2,31/105),t.setPosition(.9,.83,e.letters.BASE_Z),t.setVisible(!0);for(var o=e.animation.create(t),i=0;3>i;i++)o.addFrame(t.texture,.2*n,i/3,.2*n+.2,(i+1)/3);return o}}}),setTimeout(window.SJ[window.SJ.settings.init.module][window.SJ.settings.init.action],1),!0}var app,core={settings:"sj/core/settings.js",config:"sj/core/config.js",modules:"sj/core/modules.js",run:"sj/core/run.js"},script=function(){var xhr=new XMLHttpRequest;return xhr.onreadystatechange=function(){this.readyState===(this.DONE||4)&&eval(this.responseText)},{load:function(e){xhr.open("GET",e,!1),xhr.send(null)}}}(),json=function(){var e=new XMLHttpRequest,t=null;return e.onreadystatechange=function(){this.readyState===(this.DONE||4)&&(t=JSON.parse(this.responseText))},{load:function(n){return e.open("GET",n,!1),e.send(null),t}}}();return{init:init,script:script,json:json,getApp:function(){return app}}}();