(function(){
  "use strict";
  /* ---------- AI Brain demo (brain.html only) ---------- */
  var runBtn = document.getElementById("d-run");
  var body = document.getElementById("brief-body");
  if(!runBtn || !body) return;

  var briefs = {
    homeservices:{name:"home services company", top:"Call intent is your money metric. Most booked jobs start with a Google search like 'emergency plumber near me', then a tap to call. Everything today is ranked by cost per booked job.",
      meta:"Meta Ads: your before and after drain cleaning video is your cheapest lead source. But the generic brand ad has spent for 3 days with no calls. Pause it and move that budget to the video.",
      ga:"Website: your service pages get strong mobile traffic, but the call button disappears when you scroll. Make it stick to the screen and calls should rise without more spend.",
      social:"Social: yesterday's on the job video beat your last 10 posts. The hook, the problem in the first 2 seconds, is the pattern to repeat.",
      reviews:"Reviews: 3 new Google reviews overnight, average 4.9, and one names a tech. Draft replies are ready. Replying fast lifts your Google Maps ranking.",
      rivals:"Competitors: a rival company nearby launched a $49 inspection offer yesterday. Your move: lead with your guarantee and reviews, not a price war."},
    clinic:{name:"dental / med spa clinic", top:"Appointment intent is highest on weekday mornings and Sunday evenings. That is when your ads and posts should land, not mid afternoon.",
      meta:"Meta Ads: your whitening and check up campaign brings the cheapest booked appointments of any ad set. The generic brand ad costs 3 times more per booking. Shift budget toward the offer set.",
      ga:"Website: the doctors page is your most visited after home, but the Book button sits at the very bottom. Move it up and bookings should follow.",
      social:"Social: short provider Q and A videos get shared the most. Shares are trust. The next topic is drafted from this week's patient questions.",
      reviews:"Reviews: 4 new Google reviews, average 4.8. One asks about parking and insurance. A draft reply covers both and is ready to approve. Yelp is quiet this week.",
      rivals:"Competitors: a nearby clinic started posting daily tips. Your edge is depth. One expert video a week beats daily filler."},
    law:{name:"law firm", top:"Serious enquiries ask about cost and next steps, then go quiet. Follow up speed within 5 minutes is the leak, not the ads.",
      meta:"Meta Ads: your free consultation lead ad produces your best enquiries. The static brochure ad costs double per lead. Move budget to the consult offer.",
      ga:"Website: visitors spend longest on your practice area page, but the enquiry form asks for 8 fields. Cutting it to 3, name, phone, case type, is this week's test.",
      social:"Social: short 'what to do first' videos build more trust than firm news. The next one is scripted from a real client question, with names removed.",
      reviews:"Reviews: a client left a 5 star Google review about communication. A draft thank you reply is ready, plus a request to feature it on the site.",
      rivals:"Competitors: a rival firm published a guide for your main practice area. Your counter guide outline, from real case experience, is drafted."},
    ecommerce:{name:"e-commerce / DTC brand", top:"Most of your sales come from returning visitors, but almost all ad spend targets new ones. A small retargeting slice would likely be your cheapest sales this week.",
      meta:"Meta Ads: one product ad is eating 60% of spend with falling returns. Two quieter products convert at half the cost. Rebalance suggested. Tap approve and MAS applies it.",
      ga:"Website: checkout drop off spikes on mobile at the shipping cost step. Showing shipping cost earlier on the product page is the fix to test.",
      social:"Social: unboxing and try on content drives the most profile visits and sales. One is scheduled. A customer review repost is drafted.",
      reviews:"Reviews: a 3 star review mentions slow shipping, not product quality. A draft reply is ready. It apologises and states the new delivery timeline.",
      rivals:"Competitors: your main rival dropped prices on the category you both lead. Watch, do not match. Your bundle offer is the stronger reply."},
    restaurant:{name:"restaurant / local business", top:"Weekend bookings and orders from Instagram and Google are your strongest channel. Save the best content slot for Thursday, when people plan the weekend.",
      meta:"Meta Ads: your dinner offer ad set brings clicks at a good cost, but the lunch set has spent for 3 days with no bookings. Pause it and move that budget to dinner.",
      ga:"Website / Google profile: menu and hours pages are up after yesterday's reel, but most visitors leave before Book or Order. Move that button above the photos.",
      social:"Social: yesterday's kitchen reel beat your last 10 posts. The hook, the first 2 seconds, is the pattern to repeat.",
      reviews:"Reviews: 3 new Google reviews overnight, mostly positive, plus 1 on Yelp. Draft replies are ready. Replying within a day lifts your local ranking.",
      rivals:"Competitors: the spot two blocks away launched a weekday happy hour deal. Your move: a quieter, better offer, not a price war."},
    b2b:{name:"B2B services company", top:"Your LinkedIn posts from the founder's voice get 4 times the engagement of company page posts. The founder is the channel. Plan around that.",
      meta:"Meta Ads: the lead magnet ad brings steady clicks, but the follow up email sequence is where leads stall. A new sequence is drafted for approval.",
      ga:"Website: your services page converts visitors from LinkedIn well, but Google visitors bounce. The headline speaks to the wrong audience for search. A rewrite is suggested.",
      social:"Social: one client result post beat everything this month. Two follow ups in the same format are drafted.",
      reviews:"Reviews: a client mentioned you by name in a public post. That is a testimonial. Draft outreach to feature it is ready.",
      rivals:"Competitors: a rival firm published a lead gen guide for US buyers. Your counter guide outline, from real client results, is drafted."}
  };
  var goalLine = {
    leads:"Goal check, leads: everything below is ranked by how fast it can produce an enquiry.",
    sales:"Goal check, sales: everything below is ranked by how directly it can produce an order.",
    footfall:"Goal check, footfall and bookings: everything below is ranked by how fast it can put people through the door.",
    awareness:"Goal check, awareness: everything below is ranked by reach with the right audience, not just any audience."
  };
  function selectedChannels(){
    var out=[];
    document.querySelectorAll("#d-channels .chip").forEach(function(c){ if(c.getAttribute("aria-pressed")==="true") out.push(c.getAttribute("data-ch")); });
    return out;
  }
  document.querySelectorAll("#d-channels .chip").forEach(function(c){
    c.addEventListener("click", function(){
      c.setAttribute("aria-pressed", c.getAttribute("aria-pressed")==="true" ? "false" : "true");
    });
  });
  runBtn.addEventListener("click", function(){
    var biz = document.getElementById("d-biz").value;
    var goal = document.getElementById("d-goal").value;
    var ch = selectedChannels();
    var b = briefs[biz];
    var actions = [];
    if(ch.indexOf("meta")>-1) actions.push(b.meta);
    if(ch.indexOf("ga")>-1) actions.push(b.ga);
    if(ch.indexOf("social")>-1) actions.push(b.social);
    if(ch.indexOf("reviews")>-1) actions.push(b.reviews);
    if(ch.indexOf("rivals")>-1) actions.push(b.rivals);
    if(!actions.length) actions.push("No channels connected yet. Step one is connecting at least Meta Ads or your website, so tomorrow's brief runs on your real numbers.");
    actions = actions.slice(0,3);
    var lis = actions.map(function(a){ return "<li>"+a+"</li>"; }).join("");
    body.innerHTML =
      '<div class="bubble">Good morning 👋 Here is your <b>'+b.name+'</b> brief for today.<span class="time">08:00</span></div>' +
      '<div class="bubble"><b>The one thing that matters:</b> '+b.top+'<span class="time">08:00</span></div>' +
      '<div class="bubble"><b>'+goalLine[goal]+'</b><br/>Your top 3 actions, in order:<ul>'+lis+'</ul><span class="time">08:01</span></div>' +
      '<div class="bubble">Reply <b>YES</b> and MAS runs all three today. Reply with a number (e.g. "1 and 3") to pick. Nothing goes out without your yes.<span class="time">08:01</span></div>';
    body.scrollIntoView({behavior:"smooth", block:"nearest"});
  });
})();
