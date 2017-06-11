/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.test.student.core.dao.impl;

import com.test.student.core.dao.StudentDao;
import com.test.student.modal.Student;
import org.springframework.stereotype.Component;

/**
 *
 * @author Naveen
 */
@Component
public class StudentDaoImpl extends DaoImpl<Student, String> implements StudentDao {
    
}
