jQuery(function($){

    $burgButton = $("#burg");
    $burgOwner = $("#burg_owner");
    $burgDeadzone = $("#burg_deadzone")

    $burgButton.click(function(){
        $burgOwner.toggleClass("mobile_open");
    });

    $burgDeadzone.click(function(){
        $burgOwner.removeClass("mobile_open");
    })

});
