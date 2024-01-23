package com.jessicarosier.habittrackerjsp.models;

import jakarta.persistence.*;

import java.util.List;

    @Entity
    public class User {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        private String username;

        private String firstName;

        private String lastName;

        @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
        private List<Habit> habits;

        public User() {
        }


        public User(long id, String username, String firstName, String lastName, List<Habit> habits) {
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.habits = habits;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public List<Habit> getHabits() {
            return habits;
        }

        public void setHabits(List<Habit> habits) {
            this.habits = habits;
        }
}
