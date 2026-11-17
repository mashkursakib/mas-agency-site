(function(){
  "use strict";
  /* ---------- Lead form (start.html only) ---------- */
  var form = document.getElementById("lead-form");
  if(!form) return;
  function leadText(){
    var name = document.getElementById("f-name").value.trim();
    var interest = document.getElementById("f-interest").value;
    var goal = document.getElementById("f-goal").value.trim();
    return "Hi MAS team,\n\n"+(name ? "I'm "+name+".\n\n" : "")+"Start me with: "+interest+"\n\nWhat this first task should prove:\n"+(goal || "Not specified yet")+"\n";
  }
  form.addEventListener("submit", function(e){
    e.preventDefault();
    window.location.href = "mailto:info@masconsultancy.org?subject=" +
      encodeURIComponent("Probe order - MAS Hybrid Agency") + "&body=" + encodeURIComponent(leadText());
  });
  document.getElementById("f-wa").addEventListener("click", function(){
    window.open("https://wa.me/8801913876636?text=" + encodeURIComponent(leadText()), "_blank");
  });
})();
