$(document).ready(function(){
	$('#menu a[href="'+window.location.pathname+'"]').addClass('active');
	
	$('#loader').hide(0);
	$('body').on('click', 'a.internal, #menu a', function() {
		history.pushState({ path: this.path }, '', this.href);
		var th = this;

		$('a.active').removeClass('active');
		$('#menu a[href="'+window.location.pathname+'"]').addClass('active');

		$('#content').addClass('faded');

		$.get(th.href, function(data) {
			var $data = $(data);
            $('#content').html( $data.filter('#content')[0].children );

            setTimeout(function(){
                $('#content').removeClass('faded');
            }, 300);


			// Replace title and description
			document.title = $data.filter('title').text();
			$('meta[name=description]').attr('content', $data.filter('meta[name=description]').attr('content'));
			
			// Track on Piwik
			_paq.push(['setCustomUrl', window.location]);
			_paq.push(['setDocumentTitle', document.title]);
			_paq.push(['trackPageView']);
			_gaq.push(['_trackPageview']);
			
		});
		return false;
	});
	
	window.addEventListener('load', function() {
		// Hacky workaround for webkit initial popstate call.
		setTimeout(function() {
			$(window).bind('popstate', function() {
				$.get(location.pathname, function(data) {
					$('#content').html( $(data).filter('#content')[0].children );
					document.title = $(data).filter('title').text();

                    $('a.active').removeClass('active');
		            $('#menu a[href="'+window.location.pathname+'"]').addClass('active');
				});
				return false;
			});
		}, 100);
	});
});


/* Tooltipster v3.0.1 */;(function(e,t,n){function o(t,n){this.bodyOverflowX;this.checkInterval=null;this.content;this.$el=e(t);this.elProxyPosition;this.$elProxy;this.enabled=true;this.options=e.extend({},s,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.tooltipArrowReposition;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this.init()}function u(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function l(){return!f&&a}function c(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",s={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,delay:200,fixedWidth:0,maxWidth:0,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};o.prototype={init:function(){var t=this;if(n.querySelector){if(t.options.content!==null){t.setContent(t.options.content)}else{var r=t.$el.attr("title");if(typeof r==="undefined")r=null;t.setContent(r)}var i=t.options.functionInit(t.$el,t.content);if(typeof i!=="undefined")t.setContent(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!a&&t.options.iconDesktop||a&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!l()||t.options.touchDevices){t.mouseIsOverProxy=true;t.showTooltip()}}).on("mouseleave."+t.namespace,function(){if(!l()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(a&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t.showTooltipNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!l()||t.options.touchDevices){t.showTooltip()}})}}},showTooltip:function(){var e=this;if(e.status!="shown"&&e.status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e.showTooltipNow()}},e.options.delay)}else e.showTooltipNow()}},showTooltipNow:function(){var t=this;clearTimeout(t.timerShow);t.timerShow=null;clearTimeout(t.timerHide);t.timerHide=null;if(t.enabled&&t.content!==null){if(t.options.onlyOne){e(".tooltipstered").not(t.$el).each(function(t,n){var i=e(n),s=i[r]("status"),o=i[r]("option","autoClose");if(s!=="hidden"&&s!=="disappearing"&&o){i[r]("hide")}})}t.options.functionBefore(t.$elProxy,function(){if(t.status!=="hidden"){var n=0;if(t.status==="disappearing"){t.status="appearing";if(c()){t.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+t.options.animation+"-show");if(t.options.speed>0)t.$tooltip.delay(t.options.speed);t.$tooltip.queue(function(){t.status="shown"})}else{t.$tooltip.stop().fadeIn(function(){t.status="shown"})}}}else{t.status="appearing";var n=t.options.speed;t.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var r="tooltipster-"+t.options.animation,i="-webkit-transition-duration: "+t.options.speed+"ms; -webkit-animation-duration: "+t.options.speed+"ms; -moz-transition-duration: "+t.options.speed+"ms; -moz-animation-duration: "+t.options.speed+"ms; -o-transition-duration: "+t.options.speed+"ms; -o-animation-duration: "+t.options.speed+"ms; -ms-transition-duration: "+t.options.speed+"ms; -ms-animation-duration: "+t.options.speed+"ms; transition-duration: "+t.options.speed+"ms; animation-duration: "+t.options.speed+"ms;",s=t.options.fixedWidth>0?"width:"+Math.round(t.options.fixedWidth)+"px;":"",o=t.options.maxWidth>0?"max-width:"+Math.round(t.options.maxWidth)+"px;":"",u=t.options.interactive?"pointer-events: auto;":"";t.$tooltip=e('<div class="tooltipster-base '+t.options.theme+'" style="'+s+" "+o+" "+u+" "+i+'"><div class="tooltipster-content"></div></div>');if(c())t.$tooltip.addClass(r);t.insertContent();t.$tooltip.appendTo("body");t.positionTooltip();t.options.functionReady(t.$el,t.$tooltip);if(c()){t.$tooltip.addClass(r+"-show");if(t.options.speed>0)t.$tooltip.delay(t.options.speed);t.$tooltip.queue(function(){t.status="shown"})}else{t.$tooltip.css("display","none").fadeIn(t.options.speed,function(){t.status="shown"})}t.setCheckInterval();if(t.options.autoClose){e("body").off("."+t.namespace);if(t.options.trigger=="hover"){if(a){setTimeout(function(){e("body").on("touchstart."+t.namespace,function(){t.hideTooltip()})},0)}if(t.options.interactive){if(a){t.$tooltip.on("touchstart."+t.namespace,function(e){e.stopPropagation()})}var f=null;t.$elProxy.add(t.$tooltip).on("mouseleave."+t.namespace+"-autoClose",function(){clearTimeout(f);f=setTimeout(function(){t.hideTooltip()},t.options.interactiveTolerance)}).on("mouseenter."+t.namespace+"-autoClose",function(){clearTimeout(f)})}else{t.$elProxy.on("mouseleave."+t.namespace+"-autoClose",function(){t.hideTooltip()})}}else if(t.options.trigger=="click"){setTimeout(function(){e("body").on("click."+t.namespace+" touchstart."+t.namespace,function(){t.hideTooltip()})},0);if(t.options.interactive){t.$tooltip.on("click."+t.namespace+" touchstart."+t.namespace,function(e){e.stopPropagation()})}}}}if(t.options.timer>0){t.timerHide=setTimeout(function(){t.timerHide=null;t.hideTooltip()},t.options.timer+n)}})}},setCheckInterval:function(){var t=this;t.checkInterval=setInterval(function(){if(t.options.positionTracker){var n=t.positionInfo(t.$elProxy),r=false;if(u(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(u(n.position,t.elProxyPosition.position))r=true}else{if(u(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.positionTooltip()}}if(e("body").find(t.$el).length===0&&(t.status=="shown"||t.status=="appearing")){t.hideTooltip()}if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.status=="hidden"||e("body").find(t.$tooltip).length===0){t.cancelCheckInterval()}},200)},cancelCheckInterval:function(){clearInterval(this.checkInterval);this.checkInterval=null},hideTooltip:function(){var t=this;clearTimeout(t.timerShow);t.timerShow=null;clearTimeout(t.timerHide);t.timerHide=null;if(t.status=="shown"||t.status=="appearing"){t.status="disappearing";var n=function(){t.status="hidden";t.$tooltip.remove();t.$tooltip=null;e("body").off("."+t.namespace).css("overflow-x",t.bodyOverflowX);t.$elProxy.off("."+t.namespace+"-autoClose");t.options.functionAfter(t.$elProxy)};if(c()){t.$tooltip.clearQueue().removeClass("tooltipster-"+t.options.animation+"-show").addClass("tooltipster-dying");if(t.options.speed>0)t.$tooltip.delay(t.options.speed);t.$tooltip.queue(n)}else{t.$tooltip.stop().fadeOut(t.options.speed,n)}}},setContent:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.content=e},insertContent:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.content==="string"&&!e.options.contentAsHTML){t.text(e.content)}else{t.empty().append(e.content)}},updateTooltip:function(e){var t=this;t.setContent(e);if(t.content!==null){if(t.status!=="hidden"){t.insertContent();t.positionTooltip();if(t.options.updateAnimation){if(c()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hideTooltip()}},positionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},positionTooltip:function(){var n=this;if(n.$tooltip){n.$tooltip.css("width","");n.elProxyPosition=n.positionInfo(n.$elProxy);var r=e(t).width(),s=n.elProxyPosition,o=n.$tooltip.outerWidth(false),u=n.$tooltip.innerWidth()+1,a=n.$tooltip.outerHeight(false),f=null;if(n.$elProxy.is("area")){var l=n.$elProxy.attr("shape"),c=n.$elProxy.parent().attr("name"),h=e('img[usemap="#'+c+'"]'),p=h.offset().left,d=h.offset().top,v=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(l=="circle"){var m=parseInt(v[0]),g=parseInt(v[1]),y=parseInt(v[2]);s.dimension.height=y*2;s.dimension.width=y*2;s.offset.top=d+g-y;s.offset.left=p+m-y}else if(l=="rect"){var m=parseInt(v[0]),g=parseInt(v[1]),b=parseInt(v[2]),w=parseInt(v[3]);s.dimension.height=w-g;s.dimension.width=b-m;s.offset.top=d+g;s.offset.left=p+m}else if(l=="poly"){var E=[],S=[],x=0,T=0,N=0,C=0,k="even";for(i=0;i<v.length;i++){var L=parseInt(v[i]);if(k=="even"){if(L>N){N=L;if(i===0){x=N}}if(L<x){x=L}k="odd"}else{if(L>C){C=L;if(i==1){T=C}}if(L<T){T=L}k="even"}}s.dimension.height=C-T;s.dimension.width=N-x;s.offset.top=d+T;s.offset.left=p+x}else{s.dimension.height=h.outerHeight(false);s.dimension.width=h.outerWidth(false);s.offset.top=d;s.offset.left=p}}if(n.options.fixedWidth===0){n.$tooltip.css({width:Math.round(u)+"px","padding-left":"0px","padding-right":"0px"})}var A=0,O=0,M=0,_=parseInt(n.options.offsetY),D=parseInt(n.options.offsetX),P=n.options.position;function H(){var i=e(t).scrollLeft();if(A-i<0){var s=A-i;A=i;n.tooltipArrowReposition=s}if(A+o-i>r){var s=A-(r+i-o);A=r+i-o;n.tooltipArrowReposition=s}}function B(n,r){if(s.offset.top-e(t).scrollTop()-a-_-12<0&&r.indexOf("top")>-1){P=n}if(s.offset.top+s.dimension.height+a+12+_>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){P=n;M=s.offset.top-a-_-12}}if(P=="top"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left+D-j/2;M=s.offset.top-a-_-12;H();B("bottom","top")}if(P=="top-left"){A=s.offset.left+D;M=s.offset.top-a-_-12;H();B("bottom-left","top-left")}if(P=="top-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top-a-_-12;H();B("bottom-right","top-right")}if(P=="bottom"){var j=s.offset.left+o-(s.offset.left+s.dimension.width);A=s.offset.left-j/2+D;M=s.offset.top+s.dimension.height+_+12;H();B("top","bottom")}if(P=="bottom-left"){A=s.offset.left+D;M=s.offset.top+s.dimension.height+_+12;H();B("top-left","bottom-left")}if(P=="bottom-right"){A=s.offset.left+s.dimension.width+D-o;M=s.offset.top+s.dimension.height+_+12;H();B("top-right","bottom-right")}if(P=="left"){A=s.offset.left-D-o-12;O=s.offset.left+D+s.dimension.width+12;var F=s.offset.top+a-(s.offset.top+n.$elProxy.outerHeight(false));M=s.offset.top-F/2-_;if(A<0&&O+o>r){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=o+A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);A=s.offset.left-D-q-12-I;F=s.offset.top+a-(s.offset.top+n.$elProxy.outerHeight(false));M=s.offset.top-F/2-_}else if(A<0){A=s.offset.left+D+s.dimension.width+12;n.tooltipArrowReposition="left"}}if(P=="right"){A=s.offset.left+D+s.dimension.width+12;O=s.offset.left-D-o-12;var F=s.offset.top+a-(s.offset.top+n.$elProxy.outerHeight(false));M=s.offset.top-F/2-_;if(A+o>r&&O<0){var I=parseFloat(n.$tooltip.css("border-width"))*2,q=r-A-I;n.$tooltip.css("width",q+"px");a=n.$tooltip.outerHeight(false);F=s.offset.top+a-(s.offset.top+n.$elProxy.outerHeight(false));M=s.offset.top-F/2-_}else if(A+o>r){A=s.offset.left-D-o-12;n.tooltipArrowReposition="right"}}if(n.options.arrow){var R="tooltipster-arrow-"+P;if(n.options.arrowColor.length<1){var U=n.$tooltip.css("background-color")}else{var U=n.options.arrowColor}var z=n.tooltipArrowReposition;if(!z){z=""}else if(z=="left"){R="tooltipster-arrow-right";z=""}else if(z=="right"){R="tooltipster-arrow-left";z=""}else{z="left:"+Math.round(z)+"px;"}if(P=="top"||P=="top-left"||P=="top-right"){var W=parseFloat(n.$tooltip.css("border-bottom-width")),X=n.$tooltip.css("border-bottom-color")}else if(P=="bottom"||P=="bottom-left"||P=="bottom-right"){var W=parseFloat(n.$tooltip.css("border-top-width")),X=n.$tooltip.css("border-top-color")}else if(P=="left"){var W=parseFloat(n.$tooltip.css("border-right-width")),X=n.$tooltip.css("border-right-color")}else if(P=="right"){var W=parseFloat(n.$tooltip.css("border-left-width")),X=n.$tooltip.css("border-left-color")}else{var W=parseFloat(n.$tooltip.css("border-bottom-width")),X=n.$tooltip.css("border-bottom-color")}if(W>1){W++}var V="";if(W!==0){var J="",K="border-color: "+X+";";if(R.indexOf("bottom")!==-1){J="margin-top: -"+Math.round(W)+"px;"}else if(R.indexOf("top")!==-1){J="margin-bottom: -"+Math.round(W)+"px;"}else if(R.indexOf("left")!==-1){J="margin-right: -"+Math.round(W)+"px;"}else if(R.indexOf("right")!==-1){J="margin-left: -"+Math.round(W)+"px;"}V='<span class="tooltipster-arrow-border" style="'+J+" "+K+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var Q='<div class="'+R+' tooltipster-arrow" style="'+z+'">'+V+'<span style="border-color:'+U+';"></span></div>';n.$tooltip.append(Q)}n.$tooltip.css({top:Math.round(M)+"px",left:Math.round(A)+"px"})}}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(s,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r=null;this.each(function(){var n=e(this).data("tooltipster");if(n){switch(t[0]){case"content":case"update":if(typeof t[1]==="undefined"){r=n.content;return false}else{n.updateTooltip(t[1]);break};case"destroy":n.hideTooltip();if(n.$el[0]!==n.$elProxy[0])n.$elProxy.remove();var i=typeof n.content==="string"?n.content:e("<div></div>").append(n.content).html();n.$el.removeClass("tooltipstered").attr("title",i).removeData("tooltipster").off("."+n.namespace);break;case"disable":n.hideTooltip();n.enabled=false;break;case"elementIcon":r=n.$el[0]!==n.$elProxy[0]?n.$elProxy[0]:undefined;return false;case"elementTooltip":r=n.$tooltip?n.$tooltip[0]:undefined;return false;case"enable":n.enabled=true;break;case"hide":n.hideTooltip();break;case"option":r=n.options[t[1]];break;case"reposition":n.positionTooltip();break;case"show":n.showTooltipNow();break;case"status":r=n.status;return false;default:throw new Error('Unknown method .tooltipster("'+t[0]+'")');break}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an unitialized element')}});return r!==null?r:this}else{return this.each(function(){if(!e(this).data("tooltipster")){e(this).data("tooltipster",new o(this,t[0]))}})}}};var a=!!("ontouchstart"in t);var f=false;e("body").one("mousemove",function(){f=true});e(t).on("orientationchange",function(){e(".tooltipstered").each(function(){e(this)[r]("hide")})});e(t).on("scroll resize",function(){e(".tooltipstered").each(function(){e(this)[r]("reposition")})})})(jQuery,window,document);

$(document).ready(function() {
    $('.menu-icon').tooltipster({
          'speed': 250,
          'delay': 100,
          'animation': 'fall',
          'mode': 'top',
          'theme': 'tooltipster-shadow'
     });
});
