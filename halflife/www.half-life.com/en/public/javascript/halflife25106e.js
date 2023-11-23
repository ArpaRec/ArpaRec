Flickity.createMethods.push('_createPrevNextCells');

Flickity.prototype._createPrevNextCells = function() {
  this.on( 'select', this.setPrevNextCells );
};

Flickity.prototype.setPrevNextCells = function() {
  // remove classes
  changeSlideClasses( this.previousSlide, 'remove', 'is-previous' );
  changeSlideClasses( this.nextSlide, 'remove', 'is-next' );
  // set slides
  this.previousSlide = this.slides[ this.selectedIndex - 1 ];
  if (this.previousSlide === undefined) {
    this.previousSlide = this.slides[ this.slides.length - 1 ];
  }
  this.nextSlide = this.slides[ this.selectedIndex + 1 ];
  // add classes
  changeSlideClasses( this.previousSlide, 'add', 'is-previous' );
  changeSlideClasses( this.nextSlide, 'add', 'is-next' );
};

function changeSlideClasses( slide, method, className ) {
  if ( !slide ) {
    return;
  }
  slide.getCellElements().forEach( function( cellElem ) {
    cellElem.classList[ method ]( className );
  });
}

var hitClick= 0;
var hcHitPoints = 5;
var zoHitPoints = 7;
var sciClick = 0;
var sciCount = 10;
var sciMax = 20;
var crowbarEquipped = false;
var achievementcount = 0;

function scientistBark () {
    if ( crowbarEquipped == true ) {
      sciClick++;
      if (sciClick <= sciCount) {
          let bark = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/scientist_' + sciClick + ".mp3" );
          bark.volume = 0.4;
          bark.play();
      }
      if (sciClick >= sciMax) {
          sciClick = 0;
      }
    }
}

function crowbarSwing () {
  if ( crowbarEquipped == true ) {
    let crowbarSwing = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/cbar_miss1.mp3' );
    crowbarSwing.volume = 0.3;
    crowbarSwing.play();

    crowbarAnimate();
  }
}

function equipCrowbar () {
  crowbarEquipped = !crowbarEquipped;

  setTimeout(function(){
    let crowbarSelect = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/wpn_select.mp3' );
      crowbarSelect.volume = 0.3;
      crowbarSelect.play();
}, 300);
  
  let crowbarMoveSelect = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/wpn_moveselect.mp3' );
    crowbarMoveSelect.volume = 0.3;
    crowbarMoveSelect.play();

  
  if (crowbarEquipped) {
    $('#crowbar').addClass('crowbarEquipped');
    $('body').addClass('nocursor');
  }
  else {
    $('#crowbar').removeClass('crowbarEquipped');
    $('body').removeClass('nocursor');
  }
}

function fleshHit(event) {

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  
  if ( crowbarEquipped == true ) {
    let crowbarSelect = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/cbar_hitbod' + randomNumber + '.mp3' );
    crowbarSelect.volume = 0.1;
    crowbarSelect.play();

    $(event.target).addClass('hitFlesh');

    setTimeout(function() {
      $(event.target).removeClass('hitFlesh');
    }, 100);

    if($(event.target).closest('#headcrab, #zombie').length ){

      // Blood Splatter
      var randomNumber = Math.floor(Math.random() * 4);
      var newPanel = $("<img class='bloodparticles nodrag' src='https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/bloodspray00" + randomNumber + ".png' style=''>");

      var mouseX = event.pageX;
      var mouseY = event.pageY;
      newPanel.css({top: mouseY - 60, left: mouseX - 90});

      $("body").append(newPanel);

      setTimeout(function() {
          newPanel.remove();
      }, 500);

      var thisDead = false;
      var soundPrefix = "";
      
      //Calculate hitpoints
      var thisHitpoints = 0;
      var bIsHeadcrab = false;

      hitClick++;

      if ( event.target.id == "headcrab") {
        bIsHeadcrab = true;
        hcHitPoints--;
        thisHitpoints = hcHitPoints;
        soundPrefix = "hc";
        if ( hitClick > 3 ) {
          hitClick = 1;
        }
      }
      else {
        zoHitPoints--;
        thisHitpoints = zoHitPoints;
        soundPrefix = "zo";
        if ( hitClick > 2 ) {
          hitClick = 1;
        }
      }

      if ( thisHitpoints == 0) {
        thisDead = true;
        achievementcount++;
      }

      if ( thisDead ) {
        $(event.target).addClass('dead');
        if ( achievementcount >= 2 ) {
          $("#achievementtoast").addClass('achieved');
          setTimeout(function() {
            $("#achievementtoast").removeClass('achieved');
          }, 12000);
        }
        
      }

      setTimeout(function() {
        if ( thisHitpoints > 0) {
          let crowbarMetalHit = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/' + soundPrefix + '_pain' + hitClick + '.mp3' );
          crowbarMetalHit.volume = 0.1;
          crowbarMetalHit.play();
        }

        if ( thisDead ) {
          var randomNumber = Math.floor(Math.random() * 2) + 1;
          let crowbarMetalHit = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/hc_die' + randomNumber + '.mp3' );
          crowbarMetalHit.volume = 0.2;
          crowbarMetalHit.play();
          if (bIsHeadcrab) {
            $("#deadheadcrab").addClass('show');
          }
          else {
            $("#deadzombie").addClass('dead');
          }
        }
       
      }, 200);

    }

    crowbarAnimate();
  }
}

function metalHit () {

  var randomNumber = Math.floor(Math.random() * 2) + 1;
  
  if ( crowbarEquipped == true ) {
    let crowbarMetalHit = new Audio( 'https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/audio/cbar_hit' + randomNumber + '.mp3' );
    crowbarMetalHit.volume = 0.3;
    crowbarMetalHit.play();

    crowbarAnimate();
  }
}

function crowbarAnimate() {
  $('#crowbarHeld').addClass('crowbarSwing');
  setTimeout(function() {
    $('#crowbarHeld').removeClass('crowbarSwing');
  }, 100);
}

jQuery(document).ready(function($){

    $('.carousel').flickity({
      wrapAround: true,
      autoPlay: 1500,
      prevNextButtons: false,
      pageDots: false
    });

  var attachedImage = $("<img id='crowbarHeld' class='nodrag' src='https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/crowbar_carry.png' alt='Attached Image' style='position: absolute; width: 150px; height: 109px; z-index: 9998; pointer-events: none; '>");

  $('#scientist').on("click", function() {
    scientistBark();
  });

  $('#crowbarimage').on("click", function() {
      if (attachedImage && crowbarEquipped) {
        attachedImage.remove();
      }
      else {
        if ( crowbarEquipped != true ) {
          attachedImage = $("<img id='crowbarHeld' class='nodrag' src='https://cdn.arparec.dev/akamai/half-life.com/images/halflife25/crowbar_carry.png' alt='Attached Image' style='position: absolute; width: 150px; height: 109x; z-index: 9999; pointer-events: none; '>");
    
          var mouseX = event.pageX;
          var mouseY = event.pageY;
          attachedImage.css({top: mouseY - 55, left: mouseX - 95});
      
          $("body").append(attachedImage);
        }
      }

      equipCrowbar();
  });

  $('#headcrab, #zombie, #fungussmall, #ickyhitbox, #houndeyehitbox').on("click", function(event) {
    if(!$(event.target).closest('.dead').length) {
      fleshHit(event);
    }
    else {
      crowbarSwing(event);
    }
    
  });

  $('#loaderhitbox, #gordon, #deckvideo').on("click", function() {
    metalHit();
  });

  jQuery(document).on("click", function(event) {
    if(!$(event.target).closest('#crowbarimage, #headcrab, #zombie').length ){
      crowbarSwing();
    }
  });
  
    $(document).on("mousemove", function(event) {
        // Update the position of the div based on mouse coordinates
        $("#crowbarHeld").css({
            top: event.pageY - 60,  
            left: event.pageX - 90
        });
    });
 
  
});