// ! function(a, b) {
//   "use strict";

//   var d = !1,
//     e = !1;
//   if (b.querySelector)
//     if (a.addEventListener) d = !0;
//   if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
//     if (a.wp.receiveEmbedMessage = function(c) {
//       var d = c.data;
//       if (d.secret || d.message || d.value)
//         if (!/[^a-zA-Z0-9]/.test(d.secret)) {
//           var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
//             k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
//           for (e = 0; e < k.length; e++) k[e].style.display = "none";
//           for (e = 0; e < j.length; e++)
//             if (f = j[e], c.source === f.contentWindow) {
//               if (f.removeAttribute("style"), "height" === d.message) {
//                 if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
//                 else if (~~g < 200) g = 200;
//                 f.height = g
//                 }
//                 if ("link" === d.message)
//                   if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
//                     if (b.activeElement === f) a.top.location.href = d.value
//               } else;
//           }
//     }, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
// }(window, document);