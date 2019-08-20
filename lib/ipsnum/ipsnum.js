(function(q){
    q.fn.ipsnum = function(opt) {
        if(this.data("itervalId")) {
            clearInterval(this.data("itervalId"));
        }
        
        var cfg = {
            value: 'null',
            speed: 1000,
            interval: 0
        };
        q.extend(cfg, opt);
        
        var lineHeight = this.css("height");
        if(q("div", this).length == 0) {
            this.empty();
            this.append("<div style=\"line-height:"+lineHeight+";\">000</div><div style=\"line-height:"+lineHeight+";top:-25px;display:none;\"></div>");
        }
        
        var items = q("div", this);
        var newValue = cfg.value;
        
        function play() {
            var oldItem,newItem;
            items.each(function(){
                if(this.style.display == "none") {
                    newItem = q(this);
                    newItem.text(cfg.value);
                }else {
                    oldItem = q(this);
                }
            });
            
            oldItem.animate({top:"-"+lineHeight, opacity: 0}, 
                cfg.speed-cfg.speed / 1.2,
                function(){oldItem.css("display", "none");});
            
            newItem.css({top: lineHeight,display: "block"});
            newItem.animate({opacity: 1, top: 0}, cfg.speed-cfg.speed / 2.5);
    
        }
        
        if(cfg.interval > 0) {
            var intervalId = setInterval(play, opt.interval);
            this.data("itervalId", intervalId);
        }
        
        play();
    };
})(jQuery);
