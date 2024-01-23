package com.jessicarosier.habittrackerjsp.models;

import jakarta.persistence.*;

import java.util.List;

    @Entity
    public class Calendar {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;


        @OneToMany(cascade = CascadeType.ALL, mappedBy = "calendar")
        private List<Date> dates;


        public Calendar() {
        }

        public Calendar(long id, List<Date> dates) {
            this.id = id;
            this.dates = dates;
        }


        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public List<Date> getDates() {
            return dates;
        }

        public void setDates(List<Date> dates) {
            this.dates = dates;
        }
}
