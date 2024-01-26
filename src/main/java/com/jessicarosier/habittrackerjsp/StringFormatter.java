package com.jessicarosier.habittrackerjsp;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class StringFormatter {

    private static StringTokenizer st;

    public static List<String> getFilesInDirectory(String directory) {
        List<String> files = new ArrayList<>();
        File folder = new File(directory);
        File[] listOfFiles = folder.listFiles();
        for (File file : listOfFiles) {
            if (file.isFile()) {
                files.add(file.getName());
                System.out.println(file.getName());
            }
        }
        return files;
    }

    public static String[] splitString(String stringToSplit) {
        String[] splitString = new String[stringToSplit.length()];
        st = new StringTokenizer(stringToSplit);
        int i = 0;
        while (st.hasMoreTokens()) {
            splitString[i] = st.nextToken();
            System.out.println(splitString[i]);
            i++;
        }
        return splitString;
    }


    public static void main(String[] args) {
        String testString = "This is a test string GPM Life Insurance Company      that has    weird spacing";
        String secondTestString = "This is another    GPM Life Insurance Company   23045  182.00 1.0";

        ArrayList<String> testStringArray = new ArrayList<>();
        testStringArray.add(testString);
        testStringArray.add(secondTestString);

        testStringArray.forEach(string -> {
            splitString(string);
        });

    }
}
