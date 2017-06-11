package com.test.student.core.dao;

import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Naveen
 * @param <T>
 * @param <PK>
 */
public interface IDao<T, PK extends Serializable> {

    /**
     * Save the given entity object
     *
     * @param t persist.ence entrity object to be saved
     * @return persisted entity object.
     */
    T create(T t);

    /**
     * Read the entity object for given primary key
     *
     * @param id primary key to read the entity
     * @return entity object for given primary key
     */
    T read(PK id);

    /**
     * Update the given entity object.
     *
     * @param t update the entity object
     * @return updated enitity object
     */
    T update(T t);

    /**
     * Delete the given entity object.
     *
     * @param t delete the entity object
     */
    void delete(T t);

    /**
     * Fetch all the entity objects from given table.
     *
     * @return all entity object in the db
     */
    List<T> findAll();

}
