#include <string>

class Course
{
public:
	//Methods
	void init(std::string name, int test1, int test2, int exam);

	int* getGradesList();
	std::string getName();
	double getFinalGrade();


private:
	std::string _name;
	int _grades[3]; //array of size 3 => test1, test2, exam
	double _avg;
};

