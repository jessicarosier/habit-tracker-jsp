package com.jessicarosier.habittrackerjsp.controllers;


import com.jessicarosier.habittrackerjsp.models.Category;
import com.jessicarosier.habittrackerjsp.models.Habit;
import com.jessicarosier.habittrackerjsp.repositories.CategoryRepository;
import com.jessicarosier.habittrackerjsp.repositories.HabitRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class CategoryController {

    private CategoryRepository categoryDao;
    private HabitRepository habitDao;

    public CategoryController(CategoryRepository categoryDao, HabitRepository habitDao) {
        this.categoryDao = categoryDao;
        this.habitDao = habitDao;
    }

    @GetMapping("/physical")
    public List<Habit> physical() {
        Category physical = categoryDao.getReferenceById(1L);
        return habitDao.findAllByCategory(physical);

    }
}
