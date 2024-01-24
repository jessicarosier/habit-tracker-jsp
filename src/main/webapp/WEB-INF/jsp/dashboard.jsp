<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<jsp:include page="partials/head.jsp">
    <jsp:param name="title" value="Dashboard"/>
</jsp:include>
<body>
<main class="page-wrapper">
    <jsp:include page="partials/preloader.jsp"></jsp:include>
    <div class="container pt-5">
        <section class="row d-flex flex-row gap-3">
            <%-- Nav Panel --%>
            <jsp:include page="partials/nav.jsp"></jsp:include>
            <jsp:include page="partials/content.jsp"></jsp:include>
        </section>
    </div>


</main>


<jsp:include page="partials/script.jsp">
    <jsp:param name="js" value="js/dashboard.js"/>
</jsp:include>
</body>
</html>
