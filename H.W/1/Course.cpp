#include "Course.h"
#include <string>

void Course::init(std::string name, int test1, int test2, int exam)
{
	_name = name;
	_grades[0] = test1;
	_grades[1] = test2;
	_grades[2] = exam;
}

int* Course::getGradesList()
{
	return _grades;
}

double Course::getFinalGrade()
{
	return (_grades[0] * 0.25 + _grades[1] * 0.25 + _grades[2] * 0.5);
}

std::string Course::getName()
{
	return _name;
}