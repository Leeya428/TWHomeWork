$('document').ready(function(){
	console.log(data);
	var currentCount = 0;
	var defaultCount = 20;
	var fields = "id,images,title,url,author,publisher,price,pubdate,summary"
	loadData();

	
	$("#to-top").click(function(){
		$('body').scrollTop(0);
	});

	$(".load-more").bind('click', function(){
		loadData()
	});

	$("#search-btn").bind('click', function(){
		var searchInput = $("#search-content").val();
		searchData(searchInput);
	});


	function searchData(searchData) {	
		$.ajax({
			url: "https://api.douban.com/v2/book/search?q="+searchData+"&fields="+fields,
			dataType:'jsonp',
			success:function(data){
				$("ul li").each(function(){
    				$(this).remove();
    			});
    			renderData(data);
			},
		})
	}

	function loadData() {
		$.ajax({
			url: "https://api.douban.com/v2/book/search?tag=%E5%B0%8F%E8%AF%B4&start="+currentCount+"&fields="+fields,
			dataType: 'jsonp',
			success: function(data){
				console.log(currentCount);
				renderData(data);
				currentCount+=defaultCount;
			},
		})
	}

})


function renderData(data) {
	var bookItems = "";
	$.each(data.books, function(index, book){	
		var bookItem = "<li>"+
                "<img src='"+book.images.small+"'>"+
                "<div class='book-detail'>"+
                    "<h4 data-detail='"+book.url+"'>"+book.title+"</h4>"+
                    "<p class='book-info'>"+
                        "<span>"+book.author.join('/')+"/</span>"+
                        "<span>"+book.publisher+"/</span>"+
                        "<span>"+book.price+"/</span>"+
                        "<span>"+book.pubdate+"</span></p>"+
                    "<div class='book-summary'>"+book.summary+"</div></div></li>"
        bookItems += bookItem;

	});
	$("#book-list").append(bookItems);
	$('h4').click(function(){
		$(this).siblings('.book-summary').toggleClass('show');
	})
}