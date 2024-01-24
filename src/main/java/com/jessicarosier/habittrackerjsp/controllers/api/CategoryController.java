package com.jessicarosier.habittrackerjsp.controllers.api;


import com.jessicarosier.habittrackerjsp.models.Category;
import com.jessicarosier.habittrackerjsp.models.Habit;
import com.jessicarosier.habittrackerjsp.repositories.CategoryRepository;
import com.jessicarosier.habittrackerjsp.repositories.HabitRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    private CategoryRepository categoryDao;
    private HabitRepository habitDao;

    public CategoryController(CategoryRepository categoryDao, HabitRepository habitDao) {
        this.categoryDao = categoryDao;
        this.habitDao = habitDao;
    }

    @GetMapping("/api/habits/" + "{categoryName}")
    public List<Habit> getHabitsByCat(@PathVariable String categoryName) {
        if (categoryName.equals("All")) {
            return habitDao.findAll();
        } else {
            Category category = categoryDao.findByName(categoryName);
            return habitDao.findAllByCategory(category);
        }
    }


}
