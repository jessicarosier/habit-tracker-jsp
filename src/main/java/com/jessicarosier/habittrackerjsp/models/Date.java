package com.jessicarosier.habittrackerjsp.models;

import jakarta.persistence.*;

import java.util.List;

    @Entity
    public class Date {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private java.util.Date date;

        private String dayOfWeek;

        private String month;

        private String dayOfMonth;

        private String year;

        @OneToMany(cascade = CascadeType.ALL, mappedBy = "date")
        private List<Habit> habits;

        @ManyToOne
        private Calendar calendar;
}
