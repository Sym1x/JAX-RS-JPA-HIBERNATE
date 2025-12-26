package com.info.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnexionDB {

    String url="jdbc:postgresql://localhost:5432/people-system-db";
    String login="postgres";
    String password="postgres";
    static Connection cn; // l'objet connection

    private ConnexionDB() {
        super();
        try {
            Class.forName("org.postgresql.Driver");
            cn = DriverManager.getConnection(url, login, password);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static Connection getConnexion () {
        if (cn==null) {
            new ConnexionDB();
        }
        return cn;
    }
}