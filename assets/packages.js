(function(){
  "use strict";
  /* ---------- Package builder (packages.html only) ---------- */
  if(!document.getElementById("builder")) return;
  var fmt = function(n){ return "$" + n.toLocaleString("en-US"); };

  var bases = { launch:{label:"Launch retainer", price:1250, brain:false},
                growth:{label:"Growth retainer (Brain included)", price:2650, brain:true},
                partner:{label:"Hybrid Partner (full Brain included)", price:4750, brain:true} };
  var state = { base:"growth", addons:{}, term:3 };
  function chipGroup(id, attr, cb){
    document.querySelectorAll("#"+id+" .chip").forEach(function(c){
      c.addEventListener("click", function(){ cb(c); });
    });
  }
  function setSingle(id, el){
    document.querySelectorAll("#"+id+" .chip").forEach(function(c){ c.setAttribute("aria-pressed","false"); });
    el.setAttribute("aria-pressed","true");
  }
  chipGroup("b-base","base", function(c){ setSingle("b-base", c); state.base = c.getAttribute("data-base"); render(); });
  chipGroup("b-term","term", function(c){ setSingle("b-term", c); state.term = parseInt(c.getAttribute("data-term"),10); render(); });
  document.querySelectorAll("#b-addons .chip").forEach(function(c){
    c.addEventListener("click", function(){
      var on = c.getAttribute("aria-pressed")==="true";
      c.setAttribute("aria-pressed", on ? "false" : "true");
      state.addons[c.getAttribute("data-addon")] = !on;
      render();
    });
  });
  document.querySelectorAll(".pkg-pick").forEach(function(btn){
    btn.addEventListener("click", function(){
      var key = btn.getAttribute("data-pkg");
      state.base = key;
      document.querySelectorAll("#b-base .chip").forEach(function(c){
        c.setAttribute("aria-pressed", c.getAttribute("data-base")===key ? "true" : "false");
      });
      render();
      document.getElementById("builder").scrollIntoView({behavior:"smooth"});
    });
  });
  function render(){
    var base = bases[state.base];
    var rows = [{label: base.label, price: base.price}];
    var subtotal = base.price;
    document.querySelectorAll("#b-addons .chip").forEach(function(c){
      var key = c.getAttribute("data-addon");
      if(!state.addons[key]) return;
      var price = parseInt(c.getAttribute("data-price"),10);
      var label = c.textContent.split("·")[0].trim();
      if(key==="brain" && base.brain){
        rows.push({label: label+" (already included in "+base.label.split(" ")[0]+")", price: 0});
      } else {
        rows.push({label: label, price: price});
        subtotal += price;
      }
    });
    var disc = state.term===6 ? 0.10 : (state.term===3 ? 0.05 : 0);
    var total = Math.round(subtotal * (1-disc));
    var html = rows.map(function(r){
      return '<div class="t-row"><span>'+r.label+'</span><span>'+(r.price===0 ? "Included" : fmt(r.price))+'</span></div>';
    }).join("");
    if(disc>0) html += '<div class="t-row"><span>'+(state.term===6?"6-month":"3-month")+' discount</span><span>−'+Math.round(disc*100)+'%</span></div>';
    document.getElementById("t-rows").innerHTML = html;
    document.getElementById("t-total").textContent = fmt(total);
    document.getElementById("t-per").textContent = "per month, before ad spend · " + (state.term===1 ? "monthly rolling" : state.term+"-month term");
    var lines = rows.map(function(r){ return "• "+r.label+": "+(r.price===0?"Included":fmt(r.price)+"/mo"); }).join("\n");
    var pkgBody = "Hi MAS team,\n\nI'm interested in this package:\n\n"+lines+"\nTerm: "+(state.term===1?"Monthly rolling":state.term+" months")+"\nEstimated total: "+fmt(total)+"/month (before ad spend)\n\nAbout my business:\n";
    var mail = "mailto:info@masconsultancy.org?subject=" +
      encodeURIComponent("MAS Hybrid Agency - package enquiry") + "&body=" + encodeURIComponent(pkgBody);
    document.getElementById("t-send").setAttribute("href", mail);
    document.getElementById("t-wa").setAttribute("href", "https://wa.me/8801913876636?text=" + encodeURIComponent(pkgBody));
  }
  render();
})();
