<head>
    <style>

        table { border-collapse: collapse; width: 100%; }

        th, td { text-align: left; padding: 8px; }

        tbody tr:nth-child(even) { background-color: #f2f2f2; }

        th { background-color: #0066CC; color: white; }

        p.indent{margin-left:1em}

    </style>
</head>

<p>Hello, <#if notificationType == "Task Assignment">${userRole}</#if>
    <#if notificationType == "Task Assignment">
<p class="indent">You have been assigned these tasks in regard to the following issues:
    </#if>
    <#if notificationType == "Stakeholder Response">
<p class="indent">You've received a response from the following issues:
    </#if>
    <#if notificationType == "Case Completion">
<p class="indent">The following issues have been resolved:
    </#if>

<div style="overflow-x:auto;">
    <table>
        <th>Issue ID</th><th>Sample ID</th><th>Sample Type</th><th>Study ID</th><#if details><th>Site ID</th><th>Subject ID</th><th>Issue Type</th><th>Issue Subtype</th><th>Issue Note</th></#if>
        <#list issueList as il>
            <tr><td>${il.issueId}</td><td>${il.sampleId}</td><td>${il.sampleType}</td><td>${il.studyId}</td>
                <#if details><td>${il.siteId}</td><td>${il.subjectId}</td><td>${il.issueType}</td><td>${il.issueSubType}</td><td>${il.issueNote}</td></#if></tr>
        </#list>

    </table>
</div>

<#if notificationType == "Task Assignment"><a href="http://localhost:8080/home?role=${userRole}">Click here to see your tasks</a></#if>