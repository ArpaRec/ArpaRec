jQuery(document).ready(function($){
	var DEBUG = false;

	var layers;
	var fades;
	var expando;
	var logotype;
	var logotypepre;
	var container;
	var textcontain;
	var textcontainoffset;
	var videoButtonContainer = document.getElementById("videocontain");
	var videoBoxContainer = document.getElementById("videobox");
	var prevScrollPos = -1;
	var allowSmoothMouse = true;
	var isMouseDown = false;
	var mouseScrollMoving = false;
	var nextScrollComingFromMouseWheel = false;
	var mousewheelScrollSpeed = 120;
	var mouseScrollSmooting = 1.0 / 12.0;
	var mouseScrollTarget = (document.scrollingElement
							|| document.documentElement
							|| document.body.parentNode
							|| document.body);
	var mouseScrollTopYTarget = mouseScrollTarget.scrollTop;
	var parallaxMinWindowWidth;
	var allowParallax = false;
	var staticLayout = false;
	var hasStartedParallax = false;

	// detect ie
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		staticLayout = true;
	}
	else if(isMobile())
	{
		staticLayout = true;
	}
	
	var selector = '.slick-slide:not(.slick-cloned)';

	$().fancybox({
		selector : selector,
		backFocus : false,
		loop : true,
		buttons : [
			"zoom",
			"close"
		],
		transitionEffect: "fade"
	});
	$(document).on('click', '.slick-cloned', function(e) {
	$(selector)
		.eq( ( $(e.currentTarget).attr("data-slick-index") || 0) % $(selector).length )
		.trigger("click.fb-start", {
		$trigger: $(this)
		});
	return false;
	});

	$(".carousel").each(function(key, item){
		var c = '.c' + key;
		$(c + ' .carousel').slick({
			appendArrows : c + ' ul.slick-dots',
			slidesToShow   : 1,
			infinite : true,
			dots     : true,
			arrows   : true,
			fade	 : true,
			prevArrow: $(c + ' .controls .leftarrow'),
			appendDots: $(c + ' .controls .dots'),
			nextArrow: $(c + ' .controls .rightarrow')
		});
	});

	$.fancybox.defaults.hideScrollbar = false;

	// static layout gets no fancy js
	if(!staticLayout)
	{
		container = document.getElementById("parparent");

		const minWidthElem = document.querySelector('.xs-max-width');
		const minWidthStyle = getComputedStyle(minWidthElem);

		if(minWidthStyle != undefined)
		{
			parallaxMinWindowWidth = parseInt(minWidthStyle.width);
		}

		// add some other listeners that may add or remove parallax
		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onScroll);
		container.addEventListener('resize', onResize);

		checkWidth();

		if(allowSmoothMouse)
		{
			window.addEventListener('mousewheel', mousewheelScroll, { passive: false });
			window.addEventListener('DOMMouseScroll', mousewheelScroll, { passive: false });
			window.addEventListener('mousedown', mouseDown);
			window.addEventListener('mouseup', mouseUp);
		}
	}

	function checkWidth()
	{
		if(allowParallax && window.innerWidth <= parallaxMinWindowWidth)
		{
			// exiting parallax
			allowParallax = false;
			document.body.classList.remove("par");
			document.body.classList.add("alyxstatic");
		}
		else if(!allowParallax && window.innerWidth > parallaxMinWindowWidth)
		{
			allowParallax = true;
			document.body.classList.add("par");
			document.body.classList.remove("alyxstatic");

			parallaxWizard();
		}
	}

	function parallaxWizard() {

		if(hasStartedParallax)
		{
			return;
		}
		hasStartedParallax = true;

		layers = document.getElementsByClassName("parallax");
		fades = document.getElementsByClassName("fade");
		expando = document.getElementById("expando");
		logotypepre = document.getElementById("logotypepreface");
		logotype = document.getElementById("logotypecontainer");
		textcontain = document.getElementById("textcontain");

		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onScroll);
		container.addEventListener('resize', onResize);

		// here we get the canonical vertical position of each element
		// assuming full site width, and store it as a data value
		// to later retrieve it and manually set height proportionally
		// based on current site width
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			var t = $(layer).css('top');
			$(layer).data('topOrig', parseFloat(t));
		}

		updateScroll(false);
	}

	function onResize(e)
	{
		checkWidth();
		updateScroll(false);
	}

	function onScroll(e)
	{
		if(nextScrollComingFromMouseWheel)
		{
			// this WAS a scroll wheel event but it was for some reason masked by the browser
			nextScrollComingFromMouseWheel = false;
			updateScroll(true);
		}
		else
		{
			//e.preventDefault();
			mouseScrollMoving = false;
			updateScroll(false);
		}
	}

	function updateScroll(isUpdateFromMouseWheel)
	{
		if(!allowParallax)
		{
			mouseScrollMoving = false;
			return;
		}
		//console.log("updateScroll, isUpdateFromMouseWheel: " + isUpdateFromMouseWheel);
		// this is more complicated than it needs to be because of the youtube iframe stealing mousewheel events.
		// always snap to current offset if the mouse is down (works for side scrollbar or if the user taps anything)
		if(isMouseDown || !mouseScrollMoving)
		{
			mouseScrollTopYTarget = this.pageYOffset;
			mouseScrollMoving = false;
		}

		var wid = container.clientWidth;
		var top = mouseScrollTarget.scrollTop;
		var mod = wid / 1300;
		var topadj = top / mod;
		var pageratio = wid / window.innerHeight;

		var scaledYPos = top;
		var ratioYScalar = 1;
		var threshholdYScalar = 0.96;
		
		if(pageratio < 1.0)
		{
			// skinny
			ratioYScalar = 0.65 * ((pageratio + 0.4) / pageratio);
			threshholdYScalar += 0.125 * (0.05 / pageratio);
		}
		else
		{
			// wide
			ratioYScalar = 1.0 - (0.1*pageratio);
			threshholdYScalar -= 0.35 * (0.15 / pageratio);
		}
		
		scaledYPos = -(topadj * mod / 100) * ratioYScalar;

		var layer, speed, yPos, threshmin, threshmax;

		for (var i = 0; i < layers.length; i++) {

			layer = layers[i];

			// here we grab the original css top position and normalize
			// it to the current site width
			$(layer).css('top', $(layer).data('topOrig') * mod);

			speed = parseFloat(layer.getAttribute('data-speed'));

			var yPos = scaledYPos * speed;
			if (layer.getAttribute('data-speed') == "fixed")
			{
				fixed = true;
				yPos = top;
			}

			var fixed = false;

			if (layer.hasAttribute('data-threshmin') && layer.hasAttribute('data-threshmax'))
			{
				var delta = speed + 100;
				threshmin = layer.getAttribute('data-threshmin');
				threshmax = layer.getAttribute('data-threshmax');

				var pastThresh = 0;
				var range = threshmax - threshmin;

				if (topadj < threshmin)
				{
					speedAdj = -100;
				}
				else
				{
					pastThresh = topadj - threshmin;
				}

				var progress = easeInQuad(Math.min(pastThresh / range, 1));
				var speedmod = progress * delta;

				speedAdj = speedmod - 100;

				yPos = -(top * speedAdj / 100) * threshholdYScalar;
			}

			$(layer).css('transform', 'translate3d(0px, ' + yPos + 'px, 0px)');
		}

		var f, fadestart, fadeend, progressScaled, exStart, exEnd, lspac;

		for (var i = 0; i < fades.length; i++) {
			f = fades[i];
			if (f.hasAttribute('data-fadestart') && f.hasAttribute('data-fadeend'))
			{
				fadestart = f.getAttribute('data-fadestart');
				fadeend = f.getAttribute('data-fadeend');
			}
			else { continue; }
			progressScaled = easeInOutQuad(Math.min(Math.max(topadj - fadestart, 0) / (fadeend - fadestart), 1));
			if ($(f).hasClass('out')) { progressScaled = 1 - progressScaled; }
			$(f).css('opacity', progressScaled);
		}

		if (expando.hasAttribute('data-expandstart') && expando.hasAttribute('data-expandend'))
		{
			exStart = expando.getAttribute('data-expandstart');
			exEnd = expando.getAttribute('data-expandend');
			progressScaled = easeInOutQuad(Math.min(Math.max(topadj - exStart, 0) / (exEnd - exStart), 1));
			lspac = 0.5 + (0.6 * progressScaled);
			$(expando).css('letter-spacing', lspac + "em");
			$(expando).css('margin-right', (lspac * -1) + "em");
		}

		if(DEBUG)
		{
			$("#scrollinfo").show();
			$("#scrollinfo").html(
				"top: " + top +
				"<br />mouseScrollTopYTarget: " + mouseScrollTopYTarget +
				"<br />width: " + wid +
				"<br />height: " + window.innerHeight +
				"<br />ratio: " + pageratio +
				"<br />mod: " + mod +
				"<br />topadj: " + topadj +
				"<br />text offset: " + $(textcontain).position().top +
				"<br />parent offset: " + $(container).position().top +
				"<br />pastThresh: " + pastThresh +
				"<br />range: " + range +
				"<br />progress: " + progress +
				"<br />delta: " + delta +
				"<br />speedmod: " + speedmod +
				"<br />speedAdj: " + speedAdj +
				"<br />scaledYPos: " + scaledYPos +
				"<br />progressScaled: " + progressScaled
			);
		}

		prevScrollPos = this.pageYOffset;
	}

	function mouseDown(e)
	{
		isMouseDown = true;
	}
	function mouseUp(e)
	{
		isMouseDown = false;
	}

	function mousewheelScroll(e)
	{
		var scrollViewHeight = Math.min(document.documentElement.clientHeight, mouseScrollTarget.clientHeight);

		var vidElem = $("#videocontain");
		var vidTop = vidElem.position().top;
		var vidBottom = vidTop + vidElem.outerHeight(true);
		var vidHalfway = (vidTop + vidBottom) / 2;
		
		var delta = -normalizeWheelDelta(e) * mousewheelScrollSpeed;
		var newTarget = mouseScrollTopYTarget + delta;		
		newTarget = clamp(newTarget, 0, document.body.clientHeight - scrollViewHeight); // limit scrolling
		
		// once the mouse is past the youtube iframe, we should stop smooth scrolling
		if(allowParallax && newTarget < vidHalfway)
		{
			//console.log("got NEW scrollwheel smooth target, newTarget: " + newTarget + ", cur top: " + mouseScrollTarget.scrollTop);
			e.preventDefault(); // disable default scrolling
			mouseScrollTopYTarget = newTarget;
			
			// if not animating, start animating
			if (!mouseScrollMoving)
			{
				mouseScrollMoving = true;
				updateMouseScroll();
			}
		}
		else
		{
			if(mouseScrollMoving)
			{
				//console.log("got scrollwheel target BEYOND the video, LETTING IT SLIDE");
				// let it through, we were already smooth scrolling
				e.preventDefault();
				mouseScrollTopYTarget = newTarget;
			}
			else
			{
				//console.log("got scrollwheel target BEYOND the video, no smooth scroll");
			}
		}
	}

	function updateMouseScroll()
	{
		if(!mouseScrollMoving) return;

		var delta = (mouseScrollTopYTarget - mouseScrollTarget.scrollTop);

		if(Math.abs(delta) > 0.5)
		{
			var moveY = (delta * mouseScrollSmooting);
			if(Math.abs(moveY) < 1)
			{
				moveY = Math.sign(delta);
			}

			nextScrollComingFromMouseWheel = true;			
			
			var newTop = mouseScrollTarget.scrollTop + moveY;
			mouseScrollTarget.scrollTop = newTop;
			updateScroll(true);

			requestFrame(updateMouseScroll);
		}
		else
		{
			// allow scroll to go to the top of the page
			if(mouseScrollTopYTarget <= 1)
			{
				mouseScrollTarget.scrollTop = mouseScrollTopYTarget;
			}
			mouseScrollMoving = false;
		}
	}


});

function easeInOutQuad (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }
function easeInQuad (t) { return t*t }
function clamp (val, min, max) { return Math.min(Math.max(val, min), max); }

function normalizeWheelDelta(e){
	if(e.detail){
		if(e.wheelDelta)
			return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
		else
			return -e.detail/3 // Firefox
	}else
		return e.wheelDelta/120 // IE,Edge,Safari,Chrome
}

var requestFrame = function() { // requestAnimationFrame cross browser
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(func) {
			window.setTimeout(func, 1000 / 50);
		}
	);
}()

function isMobile()
{
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}
