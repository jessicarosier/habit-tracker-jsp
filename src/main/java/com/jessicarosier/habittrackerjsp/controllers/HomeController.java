package com.jessicarosier.habittrackerjsp.controllers;


import com.jessicarosier.habittrackerjsp.models.Habit;
import com.jessicarosier.habittrackerjsp.models.User;
import com.jessicarosier.habittrackerjsp.repositories.HabitRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class HomeController {

    private HabitRepository habitDao;

    public HomeController(HabitRepository habitDao) {
        this.habitDao = habitDao;
    }


    @GetMapping("/")
    public String index(Model model) {
        //get the current date and format it
        DateTimeFormatter currentDate = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        LocalDateTime now = LocalDateTime.now();
        //get the current week and format it
        DateTimeFormatter currentWeek = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        LocalDateTime weekStart = LocalDateTime.from(now).minusDays(7);
        LocalDateTime weekEnd = LocalDateTime.from(now).plusDays(7);
        //add the current week Start and End to the model
        model.addAttribute("weekStart", currentWeek.format(weekStart));
        model.addAttribute("weekEnd", currentWeek.format(weekEnd));
        //add the current date to the model
        model.addAttribute("date", currentDate.format(now));
        //add a new habit to the model
        model.addAttribute("habit", new Habit());
        model.addAttribute("habits", habitDao.findAll());
        //add the current User to the model
        User user = new User();
        user.setFirstName("Jessica");
        model.addAttribute("user", user);
        return "index";
    }


@GetMapping("/dashboard")
public String dashboard(Model model) {
    //get the current date and format it
    DateTimeFormatter currentDate = DateTimeFormatter.ofPattern("MMM dd, yyyy");
    LocalDateTime now = LocalDateTime.now();
    //get the current week and format it
    DateTimeFormatter currentWeek = DateTimeFormatter.ofPattern("MMM dd, yyyy");
    LocalDateTime weekStart = LocalDateTime.from(now).minusDays(7);
    LocalDateTime weekEnd = LocalDateTime.from(now).plusDays(7);
    //add the current week Start and End to the model
    model.addAttribute("weekStart", currentWeek.format(weekStart));
    model.addAttribute("weekEnd", currentWeek.format(weekEnd));
    //add the current date to the model
    model.addAttribute("date", currentDate.format(now));
    //add a new habit to the model
    model.addAttribute("habit", new Habit());
    //add the current User to the model
    User user = new User();
    user.setFirstName("Jessica");
    model.addAttribute("user", user);
    return "dashboard";
}

}
