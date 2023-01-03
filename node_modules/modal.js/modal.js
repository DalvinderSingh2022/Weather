var modal;
function Modal(args){
	this.ov;
	this.mo;
	this.mi;
	this.md;
	this.mh;
	this.mb;
	this.mf;
	this.desc;
	this.visible;
	this.keys = {"27":"close"};
	this.cerrar;
	this.exFocus;
	this.args = args;

	//Default values
	this.shapeClassname = "";
	this.shapeStyle = "";
	this.layout = "";
	this.icon = "";
	this.contentClassname = "";
	this.acc = "";
	this.show = "automatic";

	this.changevisible = function(display) {
		if("none" == display){
			this.visible = false;
		}else{
			this.visible = true;
    	}
	};

	this.display = function(display){
	    jQuery("#modal-outer").css("display",display);
	    jQuery("#overlay").css("display",display);
	    this.changevisible(display);
	};

	this.enable_scroll = function(){
		jQuery('html, body').removeClass("modal-open");
	};

	this.disable_scroll = function (){
		jQuery('html, body').addClass("modal-open");
	};

	this.close = function() {
		this.display("none");
		this.enable_scroll();
		this.md.onkeypress = "";
		this.exFocus.focus();
	};

	this.classname = function (className){
		this.md.className = className;
		this.mh.className = className;
		this.mb.className = className;
		this.mf.className = className;
		this.desc.className = className;
	};

	this.setClassName = function(obj,className) {
		if(obj.className == ""){
			obj.className = className;
		}else{
			obj.className = obj.className.concat(" "+className);
    	}
	};

	this.clean = function(){
		this.md.removeAttribute("style");
		this.mi.removeAttribute("style");
		this.classname("");
		this.mh.innerHTML = "";
		this.mb.innerHTML = "";
		this.mf.innerHTML = "";
		this.desc.innerHTML = "";
		if(this.md.children["btn-close"] != null){
			this.md.children["btn-close"].remove();
    	}
	};

	this.create = function (){
		/* Guardo el ultimo focus - Accesibilidad */
		this.exFocus = jQuery(document.activeElement);
		/* Elimino datos de anterior modal si es que hubo. */
		this.clean();
		/* Deshabilito el Scroll en la pagina. */
		this.disable_scroll();
		//Get plugins json
		/* Escape cerrar */
		if(args.close != null && args.close.escape != null && !(args.close.escape)){
			this.keys["27"] = "";
		}

		
		var plugins;
		url = "js/modal.json";
		if (typeof window['urlModal'] !== 'undefined') {
			url = window['urlModal'];
		}
		$.getJSON(url).done(function (data) {
			var args = modal.args;

			for(var dft in data.dfts){
				try {
					if(data.dfts[dft] != null){
				    	window['modal'][dft] = data.dfts[dft];
				    }
				}
				catch(err) {
				    console.log(err.message);
				    return false;
				}
			}

			/* Tipo de dato */
			var type = (args.content != null && args.content.type != null && (!args.content.type.length == 0)) ? args.content.type : "text";
			var plugin = data[type];

			/* Accesibilidad */
			modal.desc.innerHTML = (args.acc != null && args.acc.text != null && (!args.acc.text.length == 0)) ? args.acc.text : modal.acc;
			modal.setClassName(modal.desc,"only-reader");
			

			if(plugin == null){
				console.log("El plugin que usted eligio no existe");
				modal.close();
				return false;
			}
			/* Dato a mostrar */
			data = (args.content != null && args.content.data != null && (!args.content.data.length == 0)) ? args.content.data : "";
			for(var dft in plugin.dfts){
				try {
					if(plugin.dfts[dft] != null){
				    	window['modal'][dft] = plugin.dfts[dft];
				    }
				}
				catch(err) {
				    console.log(err.message);
				    return false;
				}
			}

			/* Shape */		
			modal.setClassName(modal.md, (args.shape != null && args.shape.className != null && (!args.shape.className.length == 0)) ? "modalShape-"+args.shape.className : modal.shapeClassname);

			/* Style */			
			modal.setClassName(modal.md, (args.shape != null && args.shape.style != null && (!args.shape.style.length == 0)) ? "modalStyle-"+args.shape.style : modal.shapeStyle);

			/* Layout */
			modal.setClassName(modal.md, (args.layout != null && (!args.layout.length == 0)) ? "modalLayout-"+args.layout : modal.layout);

			/* Header - Cabecera */
			modal.setClassName(modal.mh, (args.header != null && args.header.icon != null && (!args.header.icon.length == 0)) ? args.header.icon : modal.icon);
			if(args.header != null && args.header.title != null){
				modal.setClassName(modal.mh_title, (args.header.title.className != null && (args.header.title.className.length != 0)) ? args.header.title.className : "");
				modal.mh_title.innerHTML = (args.header.title.content != null && (args.header.title.content.length != 0) ? args.header.title.content : "");
			}

			/* Content - Contenido */
			modal.setClassName(modal.mb, (args.content != null && args.content.className != null && (!args.content.className.length == 0)) ? "modalContent-"+args.content.className : modal.contentClassname);

			/* Close - Cerrar */
			if(args.close == null || args.close.button == null || args.close.button){
				modal.md.appendChild(modal.cerrar);
			}

			/* Footer - Pie */
			if(args.btns != null && args.btns.length>0){
				/* Se itera sobre todos los botones parametrizados */
				for(var i = 0; i < args.btns.length; i++) {
				    var obj = args.btns[i];
				    /* Crea el boton */
					var btn = document.createElement('button');
					/* Se lo identifica por orden de creacion */
					btn.id = "mBtn-"+i;
					/* Texto del boton */
					btn.innerHTML = (obj.value) ? obj.value : obj.shape.toUpperCase()
					/* Clase que define al boton */
					modal.setClassName(btn, "btn");
					modal.setClassName(btn, (obj.shape != null && (!obj.shape.length == 0)) ? "btn-"+obj.shape : "btn-default");
					/* Accion del boton */
					if(obj.type == "function"){
						btn.setAttribute("onclick",obj.action.concat("();"));
					}else if(obj.type == "link"){
						btn.setAttribute("onclick", "window.open('"+obj.action+"', '_blank');");
					}
					/* Ademas de la accion si el boton cierra el modal o no */
					if(obj.close == null || obj.close){
						if(btn.getAttribute("onclick") == null || btn.getAttribute("onclick")==""){
							btn.setAttribute("onclick", "modal.close();");
						}else{
							btn.setAttribute("onclick", btn.getAttribute("onclick").concat("modal.close();"));
						}
					}
					/* Se le asigna al boton la tecla indicada */
					if(obj.key != null){
						modal.keys[obj.key] = btn.id;
						modal.desc.innerHTML = modal.desc.innerHTML.concat(" Presiona "+keyCodeToChar[obj.key]+" para "+btn.innerHTML+".");
					}
					modal.mf.appendChild(btn);
				}
			}

			/* Accionar boton con tecla asignada */
			jQuery(modal.md).keydown(function(e){
				if (!e) e = window.event;
			    var keyCode = e.keyCode || e.which;
			    if(modal.keys[keyCode] != ""){
				    if(modal.keys[keyCode]!="close"){
				    	jQuery("#"+modal.keys[keyCode]).click();
				    }else{
				    	modal.close();
				    }
				}
			});

			/* Overlay */
			if(args.overlay != null){
				(args.overlay.className != null && (!args.overlay.className.length == 0)) ? modal.setClassName(modal.ov, args.overlay.className) : false;
				(args.overlay.click != null && args.overlay.click) ? modal.ov.onclick = function(){modal.close();} : false;
			}else{
				modal.ov.classname = "";
				modal.ov.onclick = "";
			}
			
			var elem = document.createElement(plugin.element);

			data = modal.args.content.data;

			for(var objAttr in plugin.objAttrs){
				try {
					if(eval(plugin.objAttrs[objAttr])!= null){ //Por la explicacion de abajo es por que valido esto.
			    		elem[objAttr] = eval(plugin.objAttrs[objAttr]);//El eval va por que dentro de objAttrs pueden pasarse tambien variables dentro de los parametros del modal. Ejemplo args.content.data | width | y crear otros attrs.
			    	}
				}
				catch(err) {
					try{
				    	eval("elem."+objAttr+" = "+plugin.objAttrs[objAttr]);
				    }catch(err){
				    	console.log("error: "+err);
				    }
				}
			}
			for(var attr in plugin.attrs){
				try {
					if(eval(plugin.attrs[attr]) != null){
					    elem.setAttribute(attr,eval(plugin.attrs[attr]));
					}
				}
				catch(err) {
					try{
				    	eval("elem.setAttribute("+attr+","+plugin.attrs[attr]+")");
					}catch(err){
						console.log("error "+err);
					}
				}
			}
			modal.mb.appendChild(elem);
			if(modal.show === "automatic"){
				modal.display("block");
				jQuery("#modal-content").focus();
				jQuery("#modal-box").width((!args.width || args.width == "auto" || args.width == "") ? jQuery("#modal-content").width() : args.width);
				jQuery("#modal-inner").width(jQuery("#modal-box").outerWidth());
			}
		}).fail(function( jqxhr, textStatus, error ) {
		    var err = textStatus + ", " + error;
		    console.log( "Request Failed: " + err );
		});
	};

	this.inicialize = function() {
		var bod = document.getElementsByTagName('body')[0];

		this.mo = document.createElement('div');
		this.mo.id = "modal-outer";

    	this.ov = document.createElement('div');
    	this.ov.id = 'overlay';

    	this.mi = document.createElement('div');
    	this.mi.id = 'modal-inner';

    	this.md = document.createElement('div');
    	this.md.id = 'modal-box';

    	this.mc = document.createElement('div');
    	this.mc.id = 'modal-content';
    	this.mc.setAttribute("role","dialog");
    	this.mc.setAttribute("aria-labelledby","modal-desc modal-content");
    	this.mc.setAttribute("aria-hidden","false");
    	this.mc.setAttribute("tabindex","1");

    	this.mh = document.createElement('div');
    	this.mh.id = 'modal-header';

    	this.mh_title = document.createElement('div');
    	this.mh_title.id = "mh_title";

		this.mb = document.createElement('div');
		this.mb.id = 'modal-body';

		this.mf = document.createElement('div');
		this.mf.id = "modal-footer";

		this.desc = document.createElement("div");
		this.desc.id = "modal-desc";

		this.cerrar = document.createElement('div');
		this.cerrar.id = "btn-close";

		this.cerrar.onclick = function() {
			modal.close();
		};

		//Title dentro de Header
		this.mh.appendChild(this.mh_title);
		//Header, Body y Footer dentro de modal content
		this.mc.appendChild(this.desc);
		this.mc.appendChild(this.mh);
		this.mc.appendChild(this.mb);
		this.mc.appendChild(this.mf);
		//Modal Content dentro de modal box
		this.md.appendChild(this.mc);
		//Modal box dentro de modal inner
		this.mi.appendChild(this.md);
		//Modal inner dentro de modal outer
		this.mo.appendChild(this.mi);
		//Modal outer y overlay dentro de body
	    bod.appendChild(this.mo);
	    bod.appendChild(this.ov);
	};

	this.merge = function(){
		this.ov = modal.ov;
		this.mo = modal.mo;
		this.mi = modal.mi;
		this.md = modal.md;
		this.mh = modal.mh;
		this.mb = modal.mb;
		this.mf = modal.mf;
		this.desc = modal.desc;
		this.cerrar = modal.cerrar;
	};

	if(modal == null){
		this.inicialize();
	}else{
		this.merge();
    }
	if(this.args == null){
		return true;
	}else{
		this.create(this.args);
	}
};

jQuery.fn.modalHtml = function(args) {
	var html = this.html();
	if(args==null){
		args={};
	}
	jQuery().modal({
		"content": {"type":"html","data":html},
		"shape": {"className":"modal-2"},
		"type" : "2",
		"header" : {"icon":"none"}
	});
	modal.md.style.width = this.width()+10 + "px";
	modal.md.style.height = this.height()+10+"px";
};

jQuery.fn.modal = function(args){
	modal = new Modal(args);
};

jQuery.fn.carrousel = function(args){
	modal = new Modal(args);
};


keyCodeToChar = {8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",27:"Escape"};
charToKeyCode = {"Backspace":8,"Tab":9,"Enter":13,"Shift":16,"Ctrl":17,"Alt":18,"Esc":27};