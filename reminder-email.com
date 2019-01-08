Hi ${(userName!'')?html}, <br>
<br>
This is a reminder that "${topic?html}" will begin in ${reminderTime} on:<br>
<#if meetingTime??>
	<span style="font-weight: bold;">Date & Time:</span> ${meetingTime} <br>
</#if>
<br>
Join from a PC, Mac, iPad, iPhone or Android device: <br>
<div class="cssTab">
    Please click this URL to join. <a href="${joinUrl}">${joinUrl}</a>  <br><br>
    Note: This link should not be shared with others; it is unique to you.<br>
    <#if password??>
		Password: ${password}<br>
	</#if>
	<#if addToCalendarUrl?? && googleCalendarUrl?? && yahooCalendarUrl??>
    	<a href="${addToCalendarUrl}">Add to Calendar</a> &nbsp; <#if !(account??) || !account.isGoogleCalendarDisabled()> <a href="${googleCalendarUrl}">Add to Google Calendar</a> &nbsp; </#if> <a href="${yahooCalendarUrl}">Add to Yahoo Calendar</a>
	</#if>
</div>
<br>
<#if enablePSTN>
	<#if isUserTSPEnabled?? && isUserTSPEnabled>
	<br>
	Or Telephone: <br>
	<div class="cssTab">
    	Dial:<br>
    	<#if tollNumbers?? && ((tollNumbers?size) > 0)>
	    <#list tollNumbers as tollNumber>
        <#if tollNumber != "">
	    ${tollNumber}<br>
	    </#if>
	    </#list>
	    </#if>
	    <#if tollFreeNumbers?? && ((tollFreeNumbers?size) > 0)>
	    <#list tollFreeNumbers as tfreeNum>
	    ${tfreeNum} (${tollFreeCountrys[tfreeNum_index]!'US'} Toll Free)<br>
	    </#list>
	    </#if>
    	${(tspPsdTitle!'')?html}: ${(tspPsd!'')?html}<br>
	</div>
	<br>
	<#elseif pickedNumbers?? && ((pickedNumbers?size) > 0)>
	Or join by phone: 
	<div class="cssTab">
		<#assign n = 0><#list pickedNumbers as pickedNumber><#if (n == 0 || (n > 0 && pickedNumber.country != pickedNumbers[n - 1].country))><br>${pickedNumber.countryName!'US'}: </#if><#if (n > 0 && pickedNumber.country == pickedNumbers[n - 1].country)> or </#if>${pickedNumber.displayNumber} <#if pickedNumber.free>(Toll Free)</#if><#assign n = n + 1></#list>
		<br>
    	Webinar ID: ${meetingNumber} <br>
    	<#if h323Password?? && enablePSTNPasswordProtected??>
        Password: ${h323Password}<br>
	    </#if>
    	International numbers available: <a href="${teleConferenceUrl}">${teleConferenceUrl}</a>
	</div>
	<br>
	</#if>
<#elseif useOtherAudioConference>
	Or join by phone: <br>
	<div class="cssTab"> 
    	${(otherAudioConferenceInfo!"")?replace("\n","<br>")}
	</div>
	<br>
</#if>
<#if h323Gateway?? && ((h323Gateway?size) > 0)>
Or an H.323/SIP room system: <br>
<div class="cssTab">
    H.323: <#if ((h323Gateway?size) <= 2)>${h323Gateway[0]}<#if ((h323Gateway?size) > 1)> or ${h323Gateway[1]}</#if></#if><br>
        <#if ((h323Gateway?size) > 2)>
        <#list h323Gateway as rc>
        ${rc} <br>
        </#list>
        </#if>
    Webinar ID: ${meetingNumber} <br>
<#if h323Password??>
    Password: ${h323Password} <br>
</#if>
<br>
<#if isCRC?? && isCRC>
    SIP: ${number?c}@zoomcrc.com <br>
<#else>
    SIP: ${number?c}@${h323Gateway[0]}<#if ((h323Gateway?size) > 1)> or ${number?c}@${h323Gateway[1]}</#if> <br>
</#if>
<#if h323Password??>
    Password: ${h323Password} <br>
</#if>
</div>
</#if>

<#if enableLync??>
<br>
Or Skype for Business (Lync): <br>
<div class="cssTab">
    <a href="${lyncUrl}">${lyncUrl}</a>
</div>
</#if>

<br>
${(customTextHeader!"")?html?replace("\n","<br>")}<br>
<#if cancelUrl?? && cancelUrl != ''>
<br>
	<#if refundAmount??>
To Cancel this Registration<br>
    <div class="cssTab">
        If you  <a href="${cancelUrl}" target="_blank"> cancel your registration </a> before the start of the webinar on (${contractTimeCanRefund}), your PayPal account will be refunded ${refundAmount} within 3-5 business days.
    </div>
	<#else>
	  You can <a href="${cancelUrl}" target="_blank">cancel</a> your registration at any time.<br>
	</#if>
</#if> 