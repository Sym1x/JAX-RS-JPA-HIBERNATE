package com.info.db;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

    private static final EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("peoplePU");

    public static EntityManagerFactory getEMF() {
        return emf;
    }
}
