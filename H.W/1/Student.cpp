#include "Student.h"

std::string Student::getName(){
	return _name;
}
void Student::setName(std::string name){
	_name = name;
}

void Student::init(std::string name, Course** courses, int crsCount)
{
	_name = name;
	_Courses = courses;
	_crsCount = crsCount;



}

double Student::getAvg()
{
	double sum = 0;
	for (int i = 0; i < _crsCount; i++)
	{
		sum += _Courses[i]->getFinalGrade();

	}

	return sum / _crsCount;
}

int Student::getCrsCount()
{
	return _crsCount;
}
Course** Student::getCourses()
{
	return _Courses;
}