package com.jessicarosier.habittrackerjsp.repositories;

import com.jessicarosier.habittrackerjsp.models.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Long> {

        Habit findByName(String name);
}
