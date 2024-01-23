package com.jessicarosier.habittrackerjsp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/account")
    public String account() {
        return "user/account";
    }
}
