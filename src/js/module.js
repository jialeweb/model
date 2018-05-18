define(function(require, exports, module) {
 
        function swiper(id,id2){
        	var domId=document.getElementById(id)
        	var pagi=document.getElementById(id2)
     			var swiper= require('swiper-4.1.0.min.js')
     	  		var mySwiper = new Swiper(domId,{
				    /*slidesPerView : false,*/
				  
				    pagination: {
					    el: pagi,
					  },
				}) 
			
				
     	}
       /*  function swiper(id,x){
        	var domId=document.getElementById(id)
     			var swiper= require('swiper-4.1.0.min.js')
     	  		var mySwiper = new Swiper(domId,{
				    slidesPerView : false,
				    
				}) 
			
				
     	}*/
 	module.exports=swiper
});
