package com.test.student.core.dao.impl;

import com.test.student.core.dao.IDao;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author Naveen
 * @param <T>
 * @param <PK>
 */
public abstract class DaoImpl<T, PK extends Serializable> implements IDao<T, PK> {

    /* Persistence Entity class type. */
    protected Class<T> entityClass;

    /* Entity manager to perform DAO operations. */
    @PersistenceContext
    protected EntityManager entityManager;

    /**
     * Constructor
     */
    @SuppressWarnings("unchecked")
    public DaoImpl() {

        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        this.entityClass = (Class<T>) genericSuperclass.getActualTypeArguments()[0];
    }

    @Override
    public T create(T t) {

        this.entityManager.persist(t);
        return t;
    }

    @Override
    public T read(PK id) {
        return this.entityManager.find(entityClass, id);
    }

    @Override
    public T update(T t) {

        return this.entityManager.merge(t);
    }

    @Override
    public void delete(T t) {

        t = this.entityManager.merge(t);
        this.entityManager.remove(t);
    }

    @Override
    public List<T> findAll() {
        Query query = entityManager.createQuery("FROM " + entityClass.getName() + " c");
        return (List<T>) query.getResultList();
    }

}
