(function () {
	var d = document,
	w = window,
	p = parseInt,
	dd = d.documentElement,
	db = d.body,
	dc = d.compatMode == 'CSS1Compat',
	dx = dc ? dd: db,
	ec = encodeURIComponent;
	
	
	w.CHAT = {
		msgObj:d.getElementById("message"),
		screenheight:w.innerHeight ? w.innerHeight : dx.clientHeight,
		username:null,
		userid:null,
		socket:null,
		//让浏览器滚动条保持在最低部
		scrollToBottom:function(){
			w.scrollTo(0, this.msgObj.clientHeight);
		},
		//退出，本例只是一个简单的刷新
		logout:function(){
			//this.socket.disconnect();
			location.reload();
		},
		//提交聊天消息内容
		submit:function(){
			var content = d.getElementById("content").value;
			if(content != ''){
				var obj = {
					userid: this.userid,
					username: this.username,
					content: content
				};
				this.socket.emit('message', obj);
				d.getElementById("content").value = '';
			}
			return false;
		},
		genUid:function(){
			return new Date().getTime()+""+Math.floor(Math.random()*899+100);
		},
		//更新系统消息，本例中在用户加入、退出的时候调用
		updateSysMsg:function(o, action){
			//当前在线用户列表
			var onlineUsers = o.onlineUsers;
			//当前在线人数
			var onlineCount = o.onlineCount;
			//新加入用户的信息
			var user = o.user;
				
			//更新在线人数
			var userhtml = '';
			var separator = '';
			for(key in onlineUsers) {
		        if(onlineUsers.hasOwnProperty(key)){
					userhtml += separator+onlineUsers[key];
					separator = '、';
				}
		    }
			d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线，在线列表：'+userhtml;
			
			//添加系统消息
			var html = '';
			html += '<div class="msg-system">';
			html += user.username;
			html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
			html += '</div>';
			var section = d.createElement('section');
			section.className = 'system J-mjrlinkWrap J-cutMsg';
			section.innerHTML = html;
			this.msgObj.appendChild(section);	
			this.scrollToBottom();
		},
		//第一个界面用户提交用户名
		usernameSubmit:function(){
			var username = d.getElementById("username").value;
			if(username != ""){
				d.getElementById("username").value = '';
				d.getElementById("loginbox").style.display = 'none';
				d.getElementById("chatbox").style.display = 'block';
				this.init(username);
			}
			return false;
		},
		init:function(username){
			/*
			客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
			实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
			*/
			this.userid = this.genUid();
			this.username = username;
			
			d.getElementById("showusername").innerHTML = this.username;
			//this.msgObj.style.minHeight = (this.screenheight - db.clientHeight + this.msgObj.clientHeight) + "px";
			this.scrollToBottom();
			
			//连接websocket后端服务器
			this.socket = io.connect('http://58.155.222.148:3000');
			
			//告诉服务器端有用户登录
			this.socket.emit('login', {userid:this.userid, username:this.username});
			this.socket.emit('music', {name:"cqz"});
			this.socket.emit('img', {name:"1"});
			//监听新用户登录
			this.socket.on('login', function(o){
				CHAT.updateSysMsg(o, 'login');	
			});
			this.socket.on('music', function() {
          document.all.music.outerHTML   =  "<embed   src='cqz.mp3'   width=0   height=0   panel=0   autostart=true loop=true>";   
        });
			this.socket.on('img', function() {
          document.all.img.innerHTML   =  "<MARQUEE>"+
            "<img   src='photos/1.jpg'   width=150   height=240>"+
            "古典的青砖古典的淑女"+
            "<img   src='photos/2.jpg'   width=150   height=240>"+
             "江南水乡"+           
            "<img   src='photos/4.jpg'   width=150   height=240>"+
             "你听说过雷锋塔的故事吗"+
          
            "<img   src='photos/6.jpg'   width=150   height=240>"+
             "你看我跟水谁更灵气"+
           
            "<img   src='photos/8.jpg'   width=150   height=240>"+
             "杨柳青青江水平"+
            "<img   src='photos/9.jpg'   width=150   height=240>"+
             "无题"+
            "<img   src='photos/10.jpg'   width=150   height=240>"+
             "两只蝴蝶"+
            "<img   src='photos/11.jpg'   width=150   height=240>"+
             "我和大海背对背拥抱"+
           
           
            "<img   src='photos/15.jpg'   width=150   height=240>"+
             "闭月羞花就是指的这样的画面吧"+
            "<img   src='photos/16.jpg'   width=150   height=240>"+
             "我在这，柯景腾你在哪里"+
            "<img   src='photos/17.jpg'   width=150   height=240>"+
             "我们的约定"+
           
            "<img   src='photos/19.jpg'   width=150   height=240>"+
             "台湾在我的心中，也在我的背后"+
            "<img   src='photos/20.jpg'   width=150   height=240>"+
             "用花来形容人还是用人来形容花呢"+
            "<img   src='photos/21.jpg'   width=150   height=240>"+
             "我的眼睛大不大"+
            "<img   src='photos/22.jpg'   width=150   height=240>"+
             "漫天洁白，满身纯白，恰似我对这片土地的表白"+
            "<img   src='photos/23.jpg'   width=150   height=240>"+
             "无题"+
           
            "<img   src='photos/25.jpg'   width=150   height=240>"+
             "僕だけがいるビーチ"+
            "<img   src='photos/26.jpg'   width=150   height=240>"+
             "没有见到太阳，依然能看见阳光"+        
            
             "<img   src='photos/33.jpg'   width=150   height=240>"+
              "春色满园"+
             "<img   src='photos/34.jpg'   width=150   height=240>"+
              "是有点疲倦了，但是我觉得我的精力还可以再拍两张"+
             "<img   src='photos/35.jpg'   width=150   height=240>"+
              "我换个pose，你继续拍吧"+
            
             "<img   src='photos/37.jpg'   width=150   height=240>"+
              "再见倾城"+
             "<img   src='photos/38.jpg'   width=150   height=240>"+
              "一笑百媚生"+
            
             "<img   src='photos/40.jpg'   width=150   height=240>"+
              "没错，这里就是传说中台湾最美的地方"+
            
             "<img   src='photos/42.jpg'   width=150   height=240>"+
              "无题"+
            
             "<img   src='photos/44.jpg'   width=150   height=240>"+
              "黄昏还是黎明"+
             "<img   src='photos/45.jpg'   width=150   height=240>"+
              "云想衣裳花想容"+
             "<img   src='photos/46.jpg'   width=150   height=240>"+
              "紫色花海"+
             "<img   src='photos/47.jpg'   width=150   height=240>"+
              "我像花仙子吗"+
             "<img   src='photos/48.jpg'   width=150   height=240>"+
              "花中花，蕊中蕊"+
             "<img   src='photos/49.jpg'   width=150   height=240>"+
              "想说的都在画里了"+
           
            
             "<img   src='photos/52.jpg'   width=150   height=240>"+ 
             "这个可以作为表情包吗"+
             "<img   src='photos/53.jpg'   width=150   height=240>"+
             
              "花里秋千画外笑"+
             "<img   src='photos/55.jpg'   width=150   height=240>"+
              "你站在海边看风景，看风景的人也海边在看你"+
            
             "<img   src='photos/57.jpg'   width=150   height=240>"+
              "江山如此多娇"+
             "<img   src='photos/58.jpg'   width=150   height=240>"+
              "喂，请问是周迅吗？是的我是"+
             "<img   src='photos/59.jpg'   width=150   height=240>"+
              "风平浪静谁人将潮弄"+
             "<img   src='photos/60.jpg'   width=150   height=240>"+
              "潮如好评"+
             "<img   src='photos/61.jpg'   width=150   height=240>"+
              "碧海蓝天"+
             
             "<img   src='photos/63.jpg'   width=150   height=240>"+
              "挺好"+
             "<img   src='photos/64.jpg'   width=150   height=240>"+
              "大海也拜倒在我的石榴裙下了"+
            
             "<img   src='photos/66.jpg'   width=150   height=240>"+
              "春风如沐"+
            
             "<img   src='photos/68.jpg'   width=150   height=240>"+
              "大海你太调皮了，别拽我的鞋"+
             "<img   src='photos/69.jpg'   width=150   height=240>"+
              "大榕树屋"+           
             "<img   src='photos/71.jpg'   width=150   height=240>"+
              "万花丛中过，佛祖心中留"+
             "<img   src='photos/72.jpg'   width=150   height=240>"+
              "服务员，你怎么还上菜"+
             "<img   src='photos/73.jpg'   width=150   height=240>"+
              "小鸟依人"+
             "<img   src='photos/74.jpg'   width=150   height=240>"+
              "妹妹坐船头"+
            
             "<img   src='photos/76.jpg'   width=150   height=240>"+
              "鲜花和绿叶"+
            
             "<img   src='photos/79.jpg'   width=150   height=240>"+
              "金石滩我来了"+
             "<img   src='photos/80.jpg'   width=150   height=240>"+
              "卵石是本宝宝来过的不可磨灭的印记"+
             "<img   src='photos/81.jpg'   width=150   height=240>"+
              "再看我把你喝掉"+        
                     
             "<img   src='photos/86.jpg'   width=150   height=240>"+
              "第一次当车模，请大家多多关照"+
            
            
          +"</MARQUEE>"; 



        });
			//监听用户退出
			this.socket.on('logout', function(o){
				CHAT.updateSysMsg(o, 'logout');
			});
			
			//监听消息发送
			this.socket.on('message', function(obj){
				var isme = (obj.userid == CHAT.userid) ? true : false;
				var contentDiv = '<div>'+obj.content+'</div>';
				var usernameDiv = '<span>'+obj.username+'</span>';
				
				var section = d.createElement('section');
				if(isme){
					section.className = 'user';
					section.innerHTML = contentDiv + usernameDiv;
				} else {
					section.className = 'service';
					section.innerHTML = usernameDiv + contentDiv;
				}
				CHAT.msgObj.appendChild(section);
				CHAT.scrollToBottom();	
			});

		}
	};
	//通过“回车”提交用户名
	d.getElementById("username").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.usernameSubmit();
		}
	};
	//通过“回车”提交信息
	d.getElementById("content").onkeydown = function(e) {
		e = e || event;
		if (e.keyCode === 13) {
			CHAT.submit();
		}
	};
})();