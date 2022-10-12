//package com.changbi.magazineadmin.common.interceptor;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//@Slf4j
//public class SessionInterceptor implements HandlerInterceptor {
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//
//        log.info("===========================  SessionInterceptor START  ===========================");
//
//        log.debug("request URI : {}", request.getRequestURI());
//        //Session 검증
//        HttpSession session = request.getSession();
//        SessionUser sessionUser = (SessionUser) session.getAttribute("user");
//
//        if(sessionUser == null){
//            log.info("===========================  SessionUser is empty ===========================");
//            response.sendRedirect("/login");
//            return false;
//        }else{
//            log.debug("sessionUser@userNo: {}", sessionUser.getUserNo());
//        }
//
//        if(sessionUser != null && "ROLE_SUPER".equals(sessionUser.getRole())){
//            session.setAttribute("userName", sessionUser.getUserName());
//            session.setAttribute("SUPER", sessionUser.getRole());
//            //userRepository.insertAdminLog(sessionUser.getUserNo(), request.getRequestURI());
//        }else if(sessionUser != null && !"ROLE_SUPER".equals(sessionUser.getRole())){
//            session.setAttribute("userName", sessionUser.getUserName());
//            //userRepository.insertAdminLog(sessionUser.getUserNo(), request.getRequestURI());
//        }else {
//            return false;
//        }
//
//        log.debug("===========================  SessionInterceptor END  ===========================");
//        return HandlerInterceptor.super.preHandle(request, response, handler);
//    }
//
//    @Override
//    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
//    }
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
//    }
//
//}
