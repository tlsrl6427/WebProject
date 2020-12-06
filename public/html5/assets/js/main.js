
(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});




/*




			<script src="/__/firebase/8.1.1/firebase-app.js"></script>
			<script src="/__/firebase/8.1.1/firebase-storage.js"></script>
			<script src="/__/firebase/init.js"></script>
			<script src="../../openPopup.js"></script>

					<script>
					  // Your web app's Firebase configuration
					  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
					  var firebaseConfig = {
					    apiKey: "AIzaSyDwMYnkiXywcpwhC8OX0iQGHRwdZLnEm2o",
					    authDomain: "webproject-f85df.firebaseapp.com",
					    databaseURL: "https://webproject-f85df.firebaseio.com",
					    projectId: "webproject-f85df",
					    storageBucket: "webproject-f85df.appspot.com",
					    messagingSenderId: "505722645824",
					    appId: "1:505722645824:web:8edc2cb13f06ccf175dea5",
					    measurementId: "G-HFWKZR7F96"
					  };
					  // Initialize Firebase
						if (firebase.apps.length === 0) {
					  firebase.initializeApp(firebaseConfig);
					}
					</script>
					<script>
					var storageRef = firebase.storage().ref();
					var dataRef = firebase.database().ref();
					var pathRef = storageRef.child('basketball_1.jpg');

					function downImgURL(){pathRef.getDownloadURL().then(function(url){
						var imgPath=url;
						console.log(imgPath);
					}).catch(function(error){
						alert(error.message);
					});

					}
				</script>

// 검색기능 추가
<script>
function search_channel() {
var searchChannelName = document.getElementBYId("query").value;
document.getElementById("select_channl_name").textContent = "chName";
// var searchref = db.ref(value);

firebase.database().ref("testsearch").startAt(searchChannelName).on("value",function(snapshot){
if(snapshot.val() ) {
var chName = snapshot.key;
var chVideoNum = snapshot.val().videonum;
var chSubscribe = snapshot.val().subscribe;
var chImg = snapshot.val().channel_img_ref;
var chLink = snapshot.val().channel_ref;

document.getElementById("select_channl_link").href = chLink ;
document.getElementById("select_channl_video").img = chImg;
document.getElementById("select_channl_name").textContent = "chName";
document.getElementById("select_channl_videonum").textContent = "조회수 : "+ chVideoNum + " 구독자수 : "+ chSubscribe ;


var channel_select_page =
"<section>"
	"<div class=\"\" style=\" margin-left:8%; height: 250px; position:relative; \">"

		"<div class=\"image-container\" style=\"height: 210px; width: 280px; float:left; overflow:hidden; display:flex; align-items: center; justify-content: center; margin:20px\">"
			"<a href="+ chLink + " class=\"test\"> <img src="+ chImg + "></img> </a>"
		"</div>"
		"<div style=\"height: 210px; width: 400px; left:280px; width:30%; position:absolute;margin:20px;\">"
			"<a href="+ chLink + ">"
				"<h2 style=\"margin-top:40px; margin-left:15px\">"+ chName + "</h2>"
			"</a>"
			"<p style=\"margin-left:15px\"> 구독자수: " +chSubscribe + " 영상수: "+ chVideoNum + "<br>"
			"<a href=\"#\">채널주인스펙확인</a></p>"
		"</div>"

		"<div style=\"height: 210px; margin:20px; float:right; width:300px; width:20%\">"
			"<ul class=\"actions\" style=\"margin-top:85px;\" >"
				"<li><a href=\"#\" class=\"button\">구독</a></li>"
			"</ul>"
		"</div>"
	"</div>"
"</section>";

$(".inne").append(channel_select_page);

}
else {
console.log("검색결과가 없습니다.");
}

} );
}

</script>
*/


})(jQuery);
