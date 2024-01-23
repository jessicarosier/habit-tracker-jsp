<%--
  Created by IntelliJ IDEA.
  User: jessicarosier
  Date: 1/23/24
  Time: 11:32 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<jsp:include page="../partials/head.jsp">
    <jsp:param name="title" value="Account"/>
</jsp:include>
<body>
<main class="page-wrapper">
    <jsp:include page="../partials/preloader.jsp"></jsp:include>
    <jsp:include page="../partials/nav.jsp"></jsp:include>


    <h1>Account</h1>
</main>
<jsp:include page="../partials/script.jsp">
    <jsp:param name="js" value="js/account.js"/>
</jsp:include>
</body>
</html>
