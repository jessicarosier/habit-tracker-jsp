package com.jessicarosier.habittrackerjsp.controllers.api;

import com.jessicarosier.habittrackerjsp.models.Habit;
import com.jessicarosier.habittrackerjsp.repositories.CategoryRepository;
import com.jessicarosier.habittrackerjsp.repositories.HabitRepository;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

    @RestController
    public class HabitController {

        private HabitRepository habitRepository;

        private CategoryRepository categoryRepository;
        private Logger logger = Logger.getLogger(HabitController.class);

        public HabitController(HabitRepository habitRepository, CategoryRepository categoryRepository) {
            this.habitRepository = habitRepository;
            this.categoryRepository = categoryRepository;
        }

        @PostMapping("/api/add/habit")
        public Habit addHabit(@RequestBody Habit habit) {
            habit.setCategory(categoryRepository.findById(habit.getCatId()).get());
            habit.setCompleted(false);

            habitRepository.save(habit);
            //get the new id from the database
            habit = habitRepository.findById(habit.getId()).get();
            return habit;
        }

        @GetMapping("/api/habits")
        public ArrayList<Habit> getHabits() {
            ArrayList<Habit> habits = new ArrayList<>(habitRepository.findAll());
            return habits;
        }

        @DeleteMapping("/api/delete/habit" + "/{id}")
        public void deleteHabit(@PathVariable Long id) {
            //TODO: delete habit everywhere it is referenced on the calendar
            habitRepository.deleteById(id);
        }

        @PostMapping("/api/update/habit/status" + "/{id}")
        public Habit updateHabit(@PathVariable Long id) {
            Habit habitToUpdate = habitRepository.findById(id).get();
            if (habitToUpdate.isCompleted()) {
                habitToUpdate.setCompleted(false);
            } else {
                habitToUpdate.setCompleted(true);
            }
            habitRepository.save(habitToUpdate);
            Habit updatedHabit = habitRepository.findById(id).get();
            return updatedHabit;
        }

        @GetMapping("/api/update/percent")
        public int updatePercent() {
            ArrayList<Habit> habits = new ArrayList<>(habitRepository.findAll());
            int totalHabits = habits.size();
            if(totalHabits == 0) {
                return 0;
            }

            int completedHabits = 0;
            for (Habit habit : habits) {
                if (habit.isCompleted()) {
                    completedHabits++;
                }
            }
            int percent = (completedHabits * 100) / totalHabits;


            return percent;
        }


    }
