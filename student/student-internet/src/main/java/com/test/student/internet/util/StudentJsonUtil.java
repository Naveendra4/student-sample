/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.test.student.internet.util;


import com.test.student.model.Student;
import com.test.student.model.json.StudnetJson;
import org.springframework.stereotype.Component;

/**
 *
 * @author Naveen
 */
@Component
public class StudentJsonUtil {
   /**
    * convert student object to json model
    * @param student
    * @return 
    */
    public StudnetJson toJson(Student student) {

        StudnetJson studentJson = new StudnetJson();

            studentJson.setStudentId(student.getStudentId());
            studentJson.setAdmissionDate(DateUtil.dateToString(student.getAdmissionDate(), DateUtil.Formats.DEFAULTDATE));
            studentJson.setGender(student.getGender());
            studentJson.setEnrolledStatus(student.getEnrolledStatus());
            studentJson.setFirstName(student.getFirstName());
            studentJson.setMiddleName(student.getMiddleName());
            studentJson.setLastName(student.getLastName());
            studentJson.setDob(DateUtil.dateToString(student.getDob(), DateUtil.Formats.DEFAULTDATE));
            studentJson.setAddress(student.getAddress());
            studentJson.setContact(student.getContact());
            studentJson.setDescription(student.getDiscription());
     
        return studentJson;
    }

}
