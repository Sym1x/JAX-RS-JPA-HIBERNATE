package com.info.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;
import java.util.List;

import com.info.db.JPAUtil;
import com.info.model.Person;

public class PersonServiceImpl {

    private EntityManager em;

    // entity manager
    public PersonServiceImpl() {
        em = JPAUtil.getEMF().createEntityManager();
    }

    public boolean addPerson(Person p) {
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            em.persist(p); // ORM: persist the Person object
            tx.commit();
            System.out.println("Ajout avec succès");
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            if (tx.isActive()) tx.rollback();
            System.out.println("Erreur add");
            return false;
        }
    }

    public boolean deletePerson(int id) {
        EntityTransaction tx = em.getTransaction();
        try {
            Person p = em.find(Person.class, id);
            if (p == null) return false;

            tx.begin();
            em.remove(p);
            tx.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            if (tx.isActive()) tx.rollback();
            System.out.println("Erreur delete");
            return false;
        }
    }

    public Person getPerson(int id) {
        try {
            return em.find(Person.class, id);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Person getPersonByName(String name) {
        try {
            TypedQuery<Person> query = em.createQuery(
                    "SELECT p FROM Person p WHERE p.name = :name", Person.class
            );
            query.setParameter("name", name);
            List<Person> results = query.getResultList();
            return results.isEmpty() ? null : results.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Person[] getAllPersons() {
        try {
            TypedQuery<Person> query = em.createQuery("SELECT p FROM Person p", Person.class);
            List<Person> results = query.getResultList();
            return results.toArray(new Person[0]);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return new Person[0];
        }
    }
}
