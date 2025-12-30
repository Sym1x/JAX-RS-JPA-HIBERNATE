package com.info.router;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.info.model.Person;
import com.info.service.PersonServiceImpl;

import javax.ws.rs.OPTIONS;
import javax.ws.rs.core.Response;

@Path("/users")
public class RestRouter {

	PersonServiceImpl ps = new PersonServiceImpl();

	@GET
	@Path("/affiche")
	@Produces(MediaType.APPLICATION_JSON)
	public Person[] getAllUsers() {
		return ps.getAllPersons();
	}

	@PUT
	@Path("/add/{age}/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Object> addUser(@PathParam("age") int age, @PathParam("name") String name) {
	    Map<String, Object> response = new HashMap<>();

	    Person user = new Person();
	    user.setAge(age);
	    user.setName(name);

	    boolean ok = ps.addPerson(user);
	    response.put("state", ok ? "ok" : "failed");

	    return response;
	}

	//http://localhost:8080/people-system/api/users/remove/2
	@DELETE
	@Path("/remove/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Object> deleteUser(@PathParam("id") int id) {
		Map<String, Object> response = new HashMap<>();

		try {
			response.put("state", "ok");
			if (!ps.deletePerson(id)) {
				response.put("state", "ko: id doesn't exist");
			}
			return response;
		} catch (Exception e) {
			response.put("state", "no");
			response.put("msg", e.getMessage());
			return response;
		}
	}
	
	@PUT
	@Path("/update/{id}/{name}/{age}")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, Object> updateUser(
	        @PathParam("id") int id,
	        @PathParam("name") String name,
	        @PathParam("age") int age) {

	    Map<String, Object> response = new HashMap<>();

	    boolean ok = ps.updatePerson(id, name, age);

	    response.put("state", ok ? "ok" : "ko: id doesn't exist");
	    return response;
	}
	
	@OPTIONS
	public Response handleOptions() {
	    return Response.ok().build();
	}

}
