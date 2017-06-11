package com.test.student.internet.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    public static class DateFormats {

        public static String MMddYYYY = "MM/dd/yyyy";

        public static String HHmma = "HH:mm a";

        public static String HHmmss = "HH:mm:ss";
    }

    public enum Formats {

        DEFAULTDATE, TWELEVEHOURS, TWENTYFOURHOURS, DEFAULTDATEANDTIME, NEWDEFAULTDATE, NEWDEFALTDATE2
    };

    /**
     *
     * @param sDate
     * @param format
     * @return
     * @throws ParseException
     */
    public static final Date stringToDate(String sDate, Formats format) throws ParseException {

        DateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");

        Date date = null;

        if (format == Formats.DEFAULTDATE) {
            simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
        } else if (format == Formats.TWELEVEHOURS) {
            simpleDateFormat = new SimpleDateFormat("hh:mm a");
        } else if (format == Formats.TWENTYFOURHOURS) {
            simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
        } else if (format == Formats.DEFAULTDATEANDTIME) {
            simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm a");
        } else if (format == Formats.NEWDEFAULTDATE) {
            simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        } else if (format == Formats.NEWDEFALTDATE2) {
            simpleDateFormat = new SimpleDateFormat("MM-dd-yyyy");
        }
        try {
            date = simpleDateFormat.parse(sDate);
            System.out.println(simpleDateFormat.format(date));
        } catch (ParseException e) {
            date = null;
        }
        return date;
    }

    /**
     *
     * @param date
     * @param format
     * @return
     */
    public static final String dateToString(Date date, Formats format) {

        DateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");

        if (format == Formats.DEFAULTDATE) {
            simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
        } else if (format == Formats.TWELEVEHOURS) {
            simpleDateFormat = new SimpleDateFormat("hh:mm a");
        } else if (format == Formats.TWENTYFOURHOURS) {
            simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
        } else if (format == Formats.DEFAULTDATEANDTIME) {
            simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm a");
        }

        String sDate = simpleDateFormat.format(date);
        return sDate;
    }

}
