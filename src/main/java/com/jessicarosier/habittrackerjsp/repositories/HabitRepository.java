package com.jessicarosier.habittrackerjsp.repositories;

import com.jessicarosier.habittrackerjsp.models.Category;
import com.jessicarosier.habittrackerjsp.models.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Long> {

    Habit findByName(String name);

    List<Habit> findAllByCategory(Category category);
}
